const { default: axios } = require("axios");
const boom = require('@hapi/boom');
const models = require("../models");
const Sequelize = require('sequelize');
// const moment = require('moment');
// const momentTimezone = require('moment-timezone');
const moment = require('moment-timezone'); // Usa moment-timezone para manejar zonas horarias
const egresoService = require('./egreso.services');
const ingresoService = require('./ingreso.services');
const { cierreCaja, abrirCaja } = require('./workday.services');
const { Op } = require('sequelize')
const { Caja, Sales, User } = require('../models'); // Asegúrate de importar los modelos correctos

const {
    getSucursalCuentasOne
} = require("../services/sucursalCuentas.services");

const apiContable = require("../module/apiContable");
const informeVentas = async (query) => {
    const { negocioId, sucursalId, fechaDesde, fechaHasta, temporalidad } = query;

    let options = `/informes/general/${temporalidad}?descripcion=venta`;
    // falta agregar descripcion=venta
    if (negocioId) {
        options += `&negocioId=${negocioId}`
    }
    if (sucursalId) {
        options += `&sucursalId=${sucursalId}`
    }
    if (fechaDesde) {
        options += `&fechaDesde=${fechaDesde}`
    }
    if (fechaHasta) {
        options += `&fechaHasta=${fechaHasta}`
    }

    const rta = await apiContable.get(options);
    if (rta.status != 200) {
        throw boom.notFound("Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint")
    }
    return rta.data;
};

const informeGastos = async (query) => {
    const { negocioId, sucursalId, fechaDesde, fechaHasta, temporalidad } = query;

    let options = `/informes/general/${temporalidad}?descripcion=gasto`;
    // falta agregar descripcion=venta
    if (negocioId) {
        options += `&negocioId=${negocioId}`
    }
    if (sucursalId) {
        options += `&sucursalId=${sucursalId}`
    }
    if (fechaDesde) {
        options += `&fechaDesde=${fechaDesde}`
    }
    if (fechaHasta) {
        options += `&fechaHasta=${fechaHasta}`
    }

    const rta = await apiContable.get(options);
    if (rta.status != 200) {
        throw boom.notFound("Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint")
    }
    return rta.data;
};


const findAllVentas = async (query) => {
    const { sucursalId, sucursalCuentaId } = query;

    try {
        // Construir el objeto de condición 'where' para 'Sales'
        const whereCondition = {};
        if (sucursalCuentaId) {
            whereCondition.id_cuenta = sucursalCuentaId;
        }

        const response = await models.Sales.findAll({
            attributes: ['amount', 'id_cuenta'],
            where: whereCondition,
            include: [{
                model: models.Order,
                attributes: ['typeShipping', 'clientes', 'id_state'],
                where: {
                    sucursalId: sucursalId
                },
                include: [{
                    model: models.Table,
                    attributes: ['id_mesa', 'number']
                }],
            }]
        });

        if (!response || response.length === 0) {
            return [];
        }

        await Promise.all(response.map(async (item) => {
            const cuenta = await getSucursalCuentasOne({
                sucursalCuentaId: item.id_cuenta,
                sucursalId: sucursalId,
                codigo: null
            });

            item.dataValues.informe = {
                nombre: cuenta.cuenta.nombre,
                tipo: cuenta.cuenta.tipo,
                codigo: cuenta.cuenta.codigo,
            };
        }));

        console.log(response);
        return response;

    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener los informes");
    }
};

async function obtenerArqueoDeCaja(sucursalId) {
    try {
      // Obtener todos los registros de caja para la sucursal
      const registrosCaja = await Caja.findAll({
        where: { SucursalId: sucursalId },
        order: [['fecha_apertura', 'DESC']]
      });
      if (!registrosCaja || registrosCaja.length === 0) {
        throw new Error('No se encontraron registros de caja para la sucursal especificada');
      }
      const arqueos = await Promise.all(
        registrosCaja.map(async (registro) => {

          const usuario = await User.findByPk(registro.id_user);
  
          const totalVentas = await Sales.sum('amount', {
            where: {
              createdAt: {
                [Op.between]: [registro.fecha_apertura, registro.fecha_cierre || new Date()] 
              }
            }
          });
          const ventasTotal = totalVentas || 0;
          const montoTotalCaja = (registro.monto_inicial || 0) + (registro.monto_caja || 0);
          const diferencia = montoTotalCaja - ventasTotal; 
          const estado = registro.fecha_cierre ? 'cerrada' : 'abierta';
  
          return {
            fecha_apertura: registro.fecha_apertura,
            fecha_cierre: registro.fecha_cierre,
            monto_inicial: registro.monto_inicial,
            totalVentas: ventasTotal,
            monto_caja: registro.monto_caja || 0,
            diferencia: diferencia, 
            estado: estado, 
            aperturaUser: usuario ? {
              id: usuario.id_user,
              name: usuario.name
            } : null 
          };
        })
      );
      return arqueos;
    } catch (error) {
      throw new Error(`Error al obtener el informe de arqueo caja: ${error.message}`);
    }
  }
  


module.exports = {
    informeVentas,
    findAllVentas,
    obtenerArqueoDeCaja,
    informeGastos
};
