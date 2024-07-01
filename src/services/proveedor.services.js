const { default: axios } = require("axios");

const getProveedores = async (id) => {
    if (!id) {
        throw new Error("El ID del negocio es requerido");
    }
    try {
        const response = await axios.get(
            `${process.env.BASE_URL_CONTABLE}/proveedores/findAll/${id}`
        );
        return response.data;
    } catch (error) {
        console.error("Error al obtener los proveedores:", error);
        throw error;
    }
}
const getProveedor = async (id) => {
    try {
        const response = await axios.get(
            `${process.env.BASE_URL_CONTABLE}/proveedores/findOne/${id}`
        );
        return response.data;
    } catch (error) {
        console.error("Error al obtener el proveedor:", error);
        throw error;
    }
}
const createProveedor = async (body) => {
    try {
        const response = await axios.post(
            `${process.env.BASE_URL_CONTABLE}/proveedores`,
            body
        );
        return response.data;
    } catch (error) {
        console.error("Error al crear el proveedor:", error);
        throw error;
    }
}

const EditProveedor = async (id, body) => {
    try {
        const response = await axios.patch(
            `${process.env.BASE_URL_CONTABLE}/proveedores/${id}`,
            body
        );
        return response.data;
    } catch (error) {
        console.error("Error al editar el proveedor:", error);
        throw error;
    }
}
const deleteProveedor = async (id) => {
    try {
        const response = await axios.delete(
            `${process.env.BASE_URL_CONTABLE}/proveedores/${id}`
        );
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el proveedor:", error);
        throw error;
    }
}

module.exports = {
    getProveedor,
    getProveedores,
    createProveedor,
    EditProveedor,
    deleteProveedor
}

