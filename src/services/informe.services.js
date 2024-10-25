const { default: axios } = require('axios');
const boom = require('@hapi/boom');
const models = require('../models');
const Sequelize = require('sequelize');
// const moment = require('moment');
// const momentTimezone = require('moment-timezone');
//const moment = require('moment-timezone'); // Usa moment-timezone para manejar zonas horarias
const moment = require('moment');
const { Op } = require('sequelize');
const { Caja, Sales, User } = require('../models'); // Asegúrate de importar los modelos correctos
const { findAll } = require('./gasto.services');
const {
	getSucursalCuentasOne,
} = require('../services/sucursalCuentas.services');

const apiContable = require('../module/apiContable');
const informeVentas = async (query) => {
	const { negocioId, sucursalId, fechaDesde, fechaHasta, temporalidad } = query;

	let options = `/informes/general/${temporalidad}?descripcion=venta`;
	// falta agregar descripcion=venta
	if (negocioId) {
		options += `&negocioId=${negocioId}`;
	}
	if (sucursalId) {
		options += `&sucursalId=${sucursalId}`;
	}
	if (fechaDesde) {
		options += `&fechaDesde=${fechaDesde}`;
	}
	if (fechaHasta) {
		options += `&fechaHasta=${fechaHasta}`;
	}

	const rta = await apiContable.get(options);
	if (rta.status != 200) {
		throw boom.notFound(
			'Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint'
		);
	}
	return rta.data;
};

const informeGastos = async (query) => {
	const { negocioId, sucursalId, fechaDesde, fechaHasta, temporalidad } = query;

	let options = `/informes/general/${temporalidad}?descripcion=gasto`;
	// falta agregar descripcion=venta
	if (negocioId) {
		options += `&negocioId=${negocioId}`;
	}
	if (sucursalId) {
		options += `&sucursalId=${sucursalId}`;
	}
	if (fechaDesde) {
		options += `&fechaDesde=${fechaDesde}`;
	}
	if (fechaHasta) {
		options += `&fechaHasta=${fechaHasta}`;
	}

	const rta = await apiContable.get(options);
	if (rta.status != 200) {
		throw boom.notFound(
			'Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint'
		);
	}
	return rta.data;
};
const findAllVentas = async (query) => {
	const { sucursalId, sucursalCuentaId } = query;

	try {
		const whereCondition = {};
		if (sucursalCuentaId) {
			whereCondition.id_cuenta = sucursalCuentaId;
		}

		const response = await models.Sales.findAll({
			attributes: ['amount', 'id_cuenta', 'createdAt'],
			where: whereCondition,
			include: [
				{
					model: models.Order,
					attributes: [
						'typeShipping',
						'clientes',
						'id_state',
						'numero_mesa_finalizada',
					],
					where: {
						sucursalId: sucursalId,
					},
					include: [
						{
							model: models.Table,
							attributes: ['id_mesa', 'number'],
						},
					],
				},
			],
		});

		if (!response || response.length === 0) {
			return [];
		}

		await Promise.all(
			response.map(async (item) => {
				const cuenta = await getSucursalCuentasOne({
					sucursalCuentaId: item.id_cuenta,
					sucursalId: sucursalId,
					codigo: null,
				});

				item.dataValues.informe = {
					nombre: cuenta.cuenta.nombre,
					tipo: cuenta.cuenta.tipo,
					codigo: cuenta.cuenta.codigo,
				};

				// Formatear la fecha con Moment.js
				item.dataValues.fecha = moment(item.createdAt).format('DD/MM/YYYY');

				// Asignar el número de mesa en caso de que Table sea null
				if (
					item.Order &&
					item.Order.Table === null &&
					item.Order.numero_mesa_finalizada
				) {
					const mesaFinalizada = await models.Table.findOne({
						attributes: ['number'],
						where: { id_mesa: item.Order.numero_mesa_finalizada },
					});
					item.dataValues.id_mesa_finalizada =
						item.Order.numero_mesa_finalizada;
					item.dataValues.numero_mesa = mesaFinalizada
						? mesaFinalizada.number
						: null;

					delete item.Order.dataValues.numero_mesa_finalizada;
				} else if (item.Order && item.Order.Table) {
					item.dataValues.id_mesa_finalizada = item.Order.Table.id_mesa;
					item.dataValues.numero_mesa = item.Order.Table.number;
				}
			})
		);

		return response;
	} catch (error) {
		console.log(error);
		throw new Error('Error al obtener los informes de Servicio');
	}
};

async function obtenerEgresos({ sucursalId, fechaDesde, fechaHasta }) {
	try {
		const egresos = await findAll({
			sucursalId: sucursalId,
			fechaDesde: fechaDesde,
			fechaHasta: fechaHasta,
		});

		if (egresos && Array.isArray(egresos)) {
			return egresos.reduce((total, egreso) => total + egreso.total, 0);
		}

		return 0;
	} catch (error) {
		console.error('Error al obtener los egresos:', error);
		return 0;
	}
}

async function obtenerArqueoDeCaja(sucursalId) {
	try {
		// Obtener todos los registros de caja para la sucursal
		const registrosCaja = await Caja.findAll({
			where: { SucursalId: sucursalId },
			order: [['fecha_apertura', 'DESC']],
		});

		// Si no hay registros de caja, retornar 200 OK con un mensaje
		if (!registrosCaja || registrosCaja.length === 0) {
			return {
				status: 200,
				message:
					'No hay informes de arqueo de caja para la sucursal especificada.',
			};
		}

		const arqueos = await Promise.all(
			registrosCaja.map(async (registro) => {
				const usuario = await User.findByPk(registro.id_user);

				// Obtener el total de ventas entre apertura y cierre de caja
				const totalVentas = await Sales.sum('amount', {
					where: {
						createdAt: {
							[Op.between]: [
								registro.fecha_apertura,
								registro.fecha_cierre || new Date(),
							],
						},
					},
				});

				// Obtener los egresos realizados en el período de apertura y cierre de caja
				const totalEgresos = await obtenerEgresos({
					sucursalId: sucursalId,
					fechaDesde: registro.fecha_apertura,
					fechaHasta: registro.fecha_cierre || new Date(),
				});

				// Calcular ventas calculadas usando la fórmula proporcionada
				const ventasCalculadas =
					(registro.monto_inicial || 0) + totalVentas - totalEgresos;

				// Calcular la diferencia como ventasCalculadas - (monto_caja - totalEgresos)
				const diferencia =
					ventasCalculadas - ((registro.monto_caja || 0) - totalEgresos);

				const estado = registro.fecha_cierre ? 'cerrada' : 'abierta';

				return {
					fecha_apertura: registro.fecha_apertura,
					fecha_cierre: registro.fecha_cierre,
					monto_inicial: registro.monto_inicial,
					totalVentas: totalVentas || 0,
					monto_caja: registro.monto_caja || 0,
					totalEgresos: totalEgresos,
					diferencia: diferencia,
					montoFinal: ventasCalculadas,
					estado: estado,
					aperturaUser: usuario
						? {
								id: usuario.id_user,
								name: usuario.name,
						  }
						: null,
				};
			})
		);

		return {
			status: 200,
			data: arqueos,
		};
	} catch (error) {
		throw new Error(
			`Error al obtener el informe de arqueo de caja: ${error.message}`
		);
	}
}
module.exports = {
	informeVentas,
	findAllVentas,
	obtenerArqueoDeCaja,
	informeGastos,
};
