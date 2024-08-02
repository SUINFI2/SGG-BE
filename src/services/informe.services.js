const { default: axios } = require("axios");
const boom = require('@hapi/boom');
const models = require("../models");
const {
    getSucursalCuentasOne
} = require("../services/sucursalCuentas.services");

const apiContable = require("../module/apiContable");
const informeVentas = async (query) => {
    const { negocioId, sucursalId, fechaDesde, fechaHasta } = query;

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
        console.log("llego aqui")
        throw boom.notFound("Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint")
    }


    // armar consolidado de los asientos


    return rta.data;


};
const findAllVentas = async () => {
    try {
        const response = await models.Sales.findAll({
            attributes: ['amount', 'id_cuenta'],
            include: [{
                model: models.Order,
                attributes: ['typeShipping', 'clientes', 'id_state'],
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
            const cuenta = await getSucursalCuentasOne({ sucursalCuentaId: item.id_cuenta, sucursalId: "58e6a292-83c7-4624-942e-b1622dc659b9", codigo: null });

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


module.exports = {
    informeVentas,
    findAllVentas
};
