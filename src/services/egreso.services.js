const { default: axios } = require("axios");

const apiInventario = require("../module/apiInventario");

const findAll = async () => {
    try {
        const response = await apiInventario.get(`/egresos/findAll/`);
        if (!response || !response.data) {
            throw new Error("No se encontraron egresos");
        }
        return response.data;
    } catch (error) {
        throw new Error("Error al obtener los egresos");
    }
}
const find = async (egresoId) => {
    if (!egresoId) {
        throw boom.badRequest('egresoId is required');
    }
    try {
        const response = await apiInventario.get(`/egresos/findOne/${egresoId}`);
        if (!response || !response.data) {
            throw boom.badRequest('Egreso not found');
        }
        return response.data;
    } catch (error) {
        throw boom.badRequest('Error fetching egreso', { error });
    }
}



const create = async (body) => {
    const rta = await apiInventario.post(`/egresos/`, body);
    if (!rta) {
        throw { message: "Error" };
    }
    return rta;
}

const update = async (egresoId, body) => {
    const rta = await apiInventario.patch(`/egresos/${egresoId}`, body);
    if (!rta) {
        throw { message: "Error" };
    }
    return rta;
}

const remove = async (egresoId) => {
    const rta = await apiInventario.delete(`/egresos/${egresoId}`);
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
