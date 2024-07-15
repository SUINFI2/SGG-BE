const { default: axios } = require("axios");
const apiInventario = require("../module/apiInventario");
const boom = require("@hapi/boom");

const findAll = async (query) => {
  const { negocioId, sucursalId, categoriaId, depositoId } = query;
  let options;
  if (negocioId) {
    options = `/productos/findAll?negocioId=${negocioId}`;
  }
  if (sucursalId) {
    options = `/productos/findAll?negocioId=${negocioId}&sucursalId=${sucursalId}`;
  }

  const productos = await apiInventario.get(options);

  if (productos.status != 200) {
    throw boom.notFound(
      "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
    );
  }

  return productos.data;
};

const findOne = async (productoId) => {
  const productos = await apiInventario.get(`/productos/findOne/${productoId}`);

  if (productos.status != 200) {
    throw boom.notFound(
      "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
    );
  }

  return productos.data;
};
async function createProducts( body) {


  let newProducto = {
    descripcion: body.descripcion,
    nombre: body.nombre,
    codigo: body.codigo,
    categoriaId: body.categoriaId
  }
  if(body.imagen){newProducto.imagen = imagen;}

  const producto = await apiInventario.post(`/productos/`, newProducto);
  if (producto.status != 200) {
    throw boom.notFound(
      "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
    );
  }

    console.log("producto creado")
  //crear producto en el unico deposito asociado a la sucursal por defecto

  //buscar por sucursal los depositos asociados
  const sucursal = await apiInventario.get(`/sucursales/findOne/${body.sucursalId}`);
  if (sucursal.status != 200) {
    throw boom.notFound(
      "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
    );
  }
  console.log("sucursal obtenida")
  // crear productoDeposito
  //por logica de negocio gastronómico cada sucursal tiene un unico deposito

  let newProductoDeposito = {
    depositoId: sucursal.data.depositos[0].id , 
      productoId: producto.data.data.id
  }

  if(body.cantidad){newProductoDeposito.cantidad=body.cantidad; }
  if(body.precio){newProductoDeposito.precio = body.precio;}
  if(body.margen){newProductoDeposito.margen = body.margen;}

  console.log(newProductoDeposito);
  const productoDeposito = await apiInventario.post(
    `/depositoProductos/`,
    newProducto
  );

  if (productoDeposito.status != 200) {
    throw boom.notFound(
      "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
      // cuando notifiquen de estos errores es ESENCIAL que ingresen a la terminar del server y registrar presisamente xq fue el error
    );
  }
  return{ producto: producto.data.data, productoDeposito: productoDeposito };
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
  createProducts,
  updateProduct,
  deleteProduct,
  findOne,
};
