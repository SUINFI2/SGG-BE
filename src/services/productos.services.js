const { default: axios } = require("axios");
const apiInventario = require("../module/apiInventario");


const findAll = async (negocioId) => {
  try {
    const response = await apiInventario.get(`/productos/findAll?negocioId=${negocioId}`);
    if (!response || !response.data) {
      throw new Error("No se encontraron productos");
    }
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los productos");
  }
};
const findOne = async (id) => {
  try {
    const response = await apiInventario.get(`/productos/findOne/${id}`);
    if (!response || !response.data) {
      throw new Error("No se encontraron productos");
    }
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los productos");
  }
}


async function createProducts(body) {

  const rta = await apiInventario.post(`/productos/`, body);
  if (!rta) {
    throw { message: "Error" };
  }
  return rta;
}

async function updateProduct(id, body) {

  const rta = await apiInventario.patch(`/productos/${id}`, body);
  if (!rta) {
    throw { message: "Error" };
  }
  return rta;
}

async function deleteProduct(id) {
  const rta = await apiInventario.delete(`/productos/${id}`);
  if (!rta) {
    throw { message: "Error" };
  }
  return rta;
}
module.exports = {
  findAll,
  findOne,
  createProducts,
  updateProduct,
  deleteProduct,
};
