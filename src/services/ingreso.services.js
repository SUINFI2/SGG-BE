const { default: axios } = require("axios");
const boom = require("@hapi/boom");

const apiInventario = require("../module/apiInventario");

const findAll = async () => {
    try {
        const response = await apiInventario.get(`/ingresos/findAll/`);
        if (!response || !response.data) {
            throw new Error("No se encontraron ingresos");
        }
        return response.data;
    } catch (error) {
        throw new Error("Error al obtener los ingresos");
    }
}

const find = async (ingresoId) => {
    if (!ingresoId) {
        throw boom.badRequest('ingresoId is required');
    }
    try {
        const response = await apiInventario.get(`/ingresos/findOne/${ingresoId}`);
        if (!response || !response.data) {
            throw boom.badRequest('Ingreso not found');
        }
        return response.data;
    } catch (error) {
        throw boom.badRequest('Error fetching ingreso', { error });
    }
}

const create = async (body) => {
    const rta = await apiInventario.post(`/ingresos/`, body);
    if (!rta) {
        throw { message: "Error" };
    }
    return rta;
}

const update = async (ingresoId, body) => {
    const rta = await apiInventario.patch(`/ingresos/${ingresoId}`, body);
    if (!rta) {
        throw { message: "Error" };
    }
    return rta;
}

const remove = async (ingresoId) => {
    const rta = await apiInventario.delete(`/ingresos/${ingresoId}`);
    if (!rta) {
        throw { message: "Error" };
    }
    return rta;
}

module.exports = {
    findAll,
    find,
    create,
    update,
    remove
}


