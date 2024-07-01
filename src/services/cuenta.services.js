const { default: axios } = require("axios");

const getCuentas = async () => {
    try {
        const response = await axios.get(
            `${process.env.BASE_URL_CONTABLE}/cuentas/findAll`
        );
        return response.data;
    } catch (error) {
        console.error("Error al obtener las cuentas:", error);
        throw error;
    }
}

const getCuenta = async (id) => {
    try {
        const response = await axios.get(
            `${process.env.BASE_URL_CONTABLE}/cuentas/findOne/${id}`
        );
        return response.data;
    } catch (error) {
        console.error("Error al obtener la cuenta:", error);
        throw error;
    }
}

const createCuenta = async (body) => {
    try {
        const response = await axios.post(
            `${process.env.BASE_URL_CONTABLE}/cuentas/`,
            body
        );
        return response.data;
    } catch (error) {
        console.error("Error al crear la cuenta:", error);
        throw error;
    }
}

const EditCuenta = async (id, body) => {
    try {
        const response = await axios.patch(
            `${process.env.BASE_URL_CONTABLE}/cuentas/${id}`,
            body
        );
        return response.data;
    } catch (error) {
        console.error("Error al editar la cuenta:", error);
        throw error;
    }
}

const deleteCuenta = async (id) => {
    try {
        const response = await axios.delete(
            `${process.env.BASE_URL_CONTABLE}/cuentas/${id}`
        );
        return response.data;
    } catch (error) {
        console.error("Error al eliminar la cuenta:", error);
        throw error;
    }
}

module.exports = {
    getCuentas,
    getCuenta,
    createCuenta,
    EditCuenta,
    deleteCuenta
}