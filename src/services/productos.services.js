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
  const arrayProducts = [];
  await productos.data.forEach(async item => {
   
    arrayProducts.push({
            id: item.id,
            nombre: item.nombre,
            precio: item.depositoProducto && item.depositoProducto.precio ? item.depositoProducto.precio : null,
            cantidad: item.depositoProducto && item.depositoProducto.cantidad ? item.depositoProducto.cantidad : null,
            descipcion: item.descipcion,
            sucursalId: sucursalId,
            categoria: {
              idCategoria: item.categoriaId,
              nombre: item.categoria.nombre,
            },
            imagen: item.imagen,
            codigo: item.codigo,
    })
  });

  return arrayProducts;
};


const findOne = async (productoId) => {
  const productos = await apiInventario.get(`/productos/findOne/${productoId}`);

  if (productos.status != 200) {
    throw boom.notFound(
      'producto not found'
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

  //crear producto en el unico deposito asociado a la sucursal por defecto

  //buscar por sucursal los depositos asociados
  const sucursal = await apiInventario.get(`/sucursales/findOne/${body.sucursalId}`);
  if (sucursal.status != 200) {
    throw boom.notFound(
      "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
    );
  }
  // crear productoDeposito
  //por logica de negocio gastronómico cada sucursal tiene un unico deposito

  let newProductoDeposito = {
    depositoId: sucursal.data.depositos[0].id , 
      productoId: producto.data.data.id
  }

  if(body.cantidad){newProductoDeposito.cantidad=body.cantidad; }
  if(body.precio){newProductoDeposito.precio = body.precio;}
  if(body.margen){newProductoDeposito.margen = body.margen;}


  const productoDeposito = await apiInventario.post(
    `/depositoProductos/`,
    newProductoDeposito
  );

  
  if (productoDeposito.status != 200) {
    throw boom.notFound(
      "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
      // cuando notifiquen de estos errores es ESENCIAL que ingresen a la terminar del server y registrar presisamente xq fue el error
    );
  }
  return{ producto: producto.data.data, productoDeposito: productoDeposito.data.data };
}

async function updateProduct(id, body) {

// implementar logica separada por cada tabla
  const productoDeposito = await apiInventario.patch(`/depositoProductos/${id}`,{

  } );
  
  if (productoDeposito.status != 200) {
    throw boom.notFound(
      "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
      // cuando notifiquen de estos errores es ESENCIAL que ingresen a la terminar del server y registrar presisamente xq fue el error
    );
  }

  const productos = await apiInventario.patch(`/productos/${id}`,{

  } );
  
  if (productos.status != 200) {
    throw boom.notFound(
      "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
      // cuando notifiquen de estos errores es ESENCIAL que ingresen a la terminar del server y registrar presisamente xq fue el error
    );
  }


  return 'updated';
}

async function deleteProduct(id) {

  const producto = await apiInventario.delete(`/productos/${id}` );
  
  if (producto.status != 200) {
    throw boom.notFound(
      "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
      // cuando notifiquen de estos errores es ESENCIAL que ingresen a la terminar del server y registrar presisamente xq fue el error
    );
  }

  return producto.data.data;
}
module.exports = {
  findAll,
  findOne,
  createProducts,
  updateProduct,
  deleteProduct,
  findOne,
};
