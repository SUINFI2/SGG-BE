const { default: axios } = require("axios");

const apiContable = require("../module/apiContable");

const findAll = async () => {
    try {
        const response = await apiContable.get(`/perfiles/findAll/`);
        if (!response || !response.data) {
            throw new Error("No se encontraron perfiles");
        }
        return response.data;
    } catch (error) {
        throw new Error("Error al obtener los perfiles");
    }
}

const find = async (perfilId) => {
    if (!perfilId) {
        throw boom.badRequest('perfilId is required');
    }
    try {
        const response = await apiContable.get(`/perfiles/findOne/${perfilId}`);
        if (!response || !response.data) {
            throw boom.badRequest('Perfil not found');
        }
        return response.data;
    } catch (error) {
        throw boom.badRequest('Error fetching perfil', { error });
    }
}

const create = async (body) => {
    try {
        const response = await apiContable.post(`/perfiles/`, body);
        if (!response || !response.data) {
            throw new Error('Error al crear el perfil');
        }
        return response.data;
    } catch (error) {
        console.error('Error al crear el perfil:', error.message);
        throw error;
    }
};


const update = async (perfilId, body) => {
    try {
        const response = await apiContable.patch(`/perfiles/${perfilId}`, body);
        if (!response || !response.data) {
            throw new Error('Error al actualizar el perfil');
        }
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el perfil:', error.message);
        throw error;
    }
}
//en insomnia me dice que no encuentra la ruta( me sale:
//"message": "Error al eliminar el perfil",
//"error": "Request failed with status code 404"
const remove = async (perfilId) => {
    try {
        const response = await apiContable.delete(`/perfiles/${perfilId}`);
        if (!response || !response.data) {
            throw new Error('Error al eliminar el perfil');
        }
        return response.data;

    } catch (error) {
        console.error('Error al eliminar el perfil:', error.message);
        throw error;
    }
}

module.exports = {
    findAll,
    find,
    create,
    update,
    remove,
};