const { default: axios } = require("axios");

const getCategories = async () => {
    try {
        const response = await axios.get(
            `${process.env.BASE_URL_INVENTARIO}/categorias/findAll`
        );
        return response.data;
    } catch (error) {
        console.error("Error al obtener las categorias:", error);
        throw error;
    }
}
const getCategory = async (id) => {
    try {
        const response = await axios.get(
            `${process.env.BASE_URL_INVENTARIO}/categorias/findOne/${id}`
        );
        return response.data;
    } catch (error) {
        console.error("Error al obtener la categoria:", error);
        throw error;
    }
}
const createCategory = async (body) => {
    try {
        const response = await axios.post(
            `${process.env.BASE_URL_INVENTARIO}/categorias`,
            body
        );
        return response.data;
    } catch (error) {
        console.error("Error al crear la categoria:", error);
        throw error;
    }
}

const EditCategory = async (id, body) => {
    try {
        const response = await axios.patch(
            `${process.env.BASE_URL_INVENTARIO}/categorias/${id}`,
            body
        );
        return response.data;
    } catch (error) {
        console.error("Error al editar la categoria:", error);
        throw error;
    }
}
const deleteCategory = async (id) => {
    try {
        const response = await axios.delete(
            `${process.env.BASE_URL_INVENTARIO}/categorias/${id}`
        );
        return response.data;
    } catch (error) {
        console.error("Error al eliminar la categoria:", error);
        throw error;
    }
}



module.exports = {
    getCategories,
    getCategory,
    createCategory,
    EditCategory,
    deleteCategory
}