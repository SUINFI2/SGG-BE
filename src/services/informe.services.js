const { default: axios } = require("axios");
const boom = require('@hapi/boom');
const models = require("../models");
const Sequelize = require('sequelize');
// const moment = require('moment');
// const momentTimezone = require('moment-timezone');
const moment = require('moment-timezone'); // Usa moment-timezone para manejar zonas horarias
const {
    getSucursalCuentasOne
} = require("../services/sucursalCuentas.services");

const apiContable = require("../module/apiContable");
const informeVentas = async (query) => {
    const { negocioId, sucursalId, fechaDesde, fechaHasta, temporalidad } = query;

    let options = `/asientos/findAll/?`;
    // falta agregar descripcion=venta
    if (negocioId) {
        options += `negocioId=${negocioId}`
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


    // armar consolidado de los asientos
    const filteredData = rta.data.filter(item => item.cuentaSucursal !== null);

    //groupByDay(filteredData);
    //groupByWeek(filteredData);
    //groupByMonth(filteredData);
    switch(temporalidad){
        case'day':{ return agregarTurnoYId(groupByDay(filteredData));}
        case'week':{ return agregarTurnoYId(groupByWeek(filteredData));}
        case'month':{ return agregarTurnoYId(groupByMonth(filteredData));}
    }

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



const obtenerArqueoDeCaja = async (query) => {
    const { sucursalId } = query;
    const workdays = await models.Workday.findAll({
        where: {
            id_user: {
                [Sequelize.Op.not]: null 
            },
        },
        order: [["start_time", "DESC"]],
        attributes: ['start_time', 'end_time', 'monto_en_caja', 'isActive']
    });
    if (!workdays.length) {
        throw boom.notFound('No se encontraron jornadas laborales para la sucursal especificada');
    }
    const today = moment.tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD');
    const startOfDay = moment.tz(today, 'YYYY-MM-DD', 'America/Argentina/Buenos_Aires').startOf('day').toISOString();
    const endOfDay = moment.tz(today, 'YYYY-MM-DD', 'America/Argentina/Buenos_Aires').endOf('day').toISOString();
    const resultados = await Promise.all(workdays.map(async workday => {
        try {
            const ventasDelPeriodo = await models.Sales.sum('amount', {
                include: [{
                    model: models.Order,
                    attributes: [],
                    where: { sucursalId: sucursalId }
                }],
                where: {
                    createdAt: {
                        [Sequelize.Op.between]: [startOfDay, endOfDay]
                    }
                }
            });
            let fechaInforme = 'Fecha no disponible';
            if (workday.end_time) {
                const endTime = moment(workday.end_time, 'HH:mm:ss');
                const endDate = moment(today).set({
                    hour: endTime.hour(),
                    minute: endTime.minute(),
                    second: endTime.second()
                });
                fechaInforme = endDate.isValid() ? endDate.format('DD/MM/YY') : 'Fecha no disponible';
            }
            const diferencia = (workday.monto_en_caja || 0) - ventasDelPeriodo;
            return {
                horaDeApertura: moment(startOfDay).format('YYYY-MM-DD HH:mm:ss'),
                horaDeCierre: moment(endOfDay).format('YYYY-MM-DD HH:mm:ss'),
                caja: workday.monto_en_caja,
                diferencia: diferencia,
                estado: workday.isActive ? 'Abierto' : 'Cerrado',
                totalVentas: ventasDelPeriodo || 0,
                fecha: fechaInforme 
            };
        } catch (error) {
            throw boom.internal('Error al consultar ventas del periodo');
        }
    }));
    const totalVentas = resultados.reduce((acc, cierre) => acc + (cierre.totalVentas || 0), 0);
    return {
        totalVentas: totalVentas,
        cierres: resultados
    };
};




// Función para separar por día y acumular montos
function groupByDay(array) {
    const groups = {};
    array.forEach(item => {
        const day = new Date(item.createdAt).toISOString().split('T')[0];
        if (!groups[day]) {
            groups[day] = { date: day, total: "$0" };
        }
        if (item.tipo === "debe") {
            const currentTotal = parseInt(groups[day].total.slice(1), 10);
            groups[day].total = `$${currentTotal + item.monto}`;
        }
    });
    return Object.values(groups);
}

// Función para separar por semana y acumular montos
function groupByWeek(array) {
    const groups = {};
    array.forEach(item => {
        const date = new Date(item.createdAt);
        const week = `${date.getFullYear()}-W${Math.ceil((date.getDate() - 1 - date.getDay()) / 7 + 1)}`;
        if (!groups[week]) {
            groups[week] = { date: week, total: "$0" };
        }
        if (item.tipo === "debe") {
            const currentTotal = parseInt(groups[week].total.slice(1), 10);
            groups[week].total = `$${currentTotal + item.monto}`;
        }
    });
    return Object.values(groups);
}

// Función para separar por mes y acumular montos
function groupByMonth(array) {
    const groups = {};
    array.forEach(item => {
        const date = new Date(item.createdAt);
        const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        if (!groups[month]) {
            groups[month] = { date: month, total: "$0" };
        }
        if (item.tipo === "debe") {
            const currentTotal = parseInt(groups[month].total.slice(1), 10);
            groups[month].total = `$${currentTotal + item.monto}`;
        }
    });
    return Object.values(groups);
}
function agregarTurnoYId(arr) {
    return arr.map((item, index) => {
      return {
        ...item,
        turno: "Full",
        id: index + 1
      };
    });
  }

module.exports = {
    informeVentas,
    findAllVentas,
    obtenerArqueoDeCaja
};
