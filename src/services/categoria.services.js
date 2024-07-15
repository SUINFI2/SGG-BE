const { default: axios } = require("axios");
const apiInventario = require("../module/apiInventario");

const getCategories = async (negocioId) => {
    try {
        const response = await apiInventario.get(`/categorias/findAll`, {
            params: { negocioId }
        });
        if (!response || !response.data) {
            throw new Error("No se encontraron categorías");
        }
        return response.data;
    } catch (error) {
        console.error(`Error al obtener las categorías: ${error.message}`);
        throw new Error("Error al obtener las categorías");
    }
};

const getCategory = async (id) => {

    try {
        const response = await apiInventario.get(`/categorias/findOne/${id}`);
        if (!response || !response.data) {
            throw new Error("No se encontró la categoría");
        }
        return response.data;

    } catch (error) {
        console.error(`Error al obtener la categoría: ${error.message}`);
        throw new Error("Error al obtener la categoría");

    }
};
const createCategory = async (body) => {

    const rta = await apiInventario.post(`/categorias/`, body);
    if (!rta) {
        throw { message: "Error" };
    }
    return rta;
};

const EditCategory = async (id, body) => {

    const rta = await apiInventario.patch(`/categoria/${id}`, body);
    if (!rta) {
        throw { message: "Error" };
    }
    return rta;
};
const deleteCategory = async (id) => {

    const rta = await apiInventario.post(`/categoria/${id}`);
    if (!rta) {
        throw { message: "Error" };
    }
    return rta;
};

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    EditCategory,
    deleteCategory,
};
