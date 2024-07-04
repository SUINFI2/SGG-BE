const { default: axios } = require("axios");

const obtenerProductos = async () => {


  try {
    const response = await axios.get(
      `${process.env.BASE_URL_INVENTARIO}/productos/findAll`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};

async function obtenerProductosPaginados(page = 1, limit = 10, query = "") {
  const productos = await obtenerProductos();
  try {
    const productosFiltrados = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(query.toLowerCase())
    );

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedProductos = productosFiltrados.slice(startIndex, endIndex);

    return {
      total: productos.length,
      page: page,
      limit: limit,
      data: paginatedProductos,
    };
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
}

async function createProducts(body) {
  try {
    const response = await axios.post(
      `${process.env.BASE_URL_INVENTARIO}/productos`,
      body
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw error;
  }
}

async function updateProduct(id, body) {
  console.log(id, body);
  try {
    const response = await axios.patch(
      `${process.env.BASE_URL_INVENTARIO}/productos/${id}`,
      body
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw error;
  }
}

async function deleteProduct(id) {
  try {
    const response = await axios.delete(
      `${process.env.BASE_URL_INVENTARIO}/productos/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
}
module.exports = {
  obtenerProductos,
  obtenerProductosPaginados,
  createProducts,
  updateProduct,
  deleteProduct,
};
