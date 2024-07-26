const { query } = require("express");
const { Sales, orderProduct } = require("../models");
const sales = require("../models/sales");
const apiContable = require("../module/apiContable");
const boom = require("@hapi/boom");
const { createVenta } = require("./contabilidad.services");

/* const findAll = async (negocioId) => {

    const proveedor = await apiContable.get(`/proveedores/findAll?negocioId=${negocioId}`);

    if(proveedor.status!=200){
      throw boom.notFound(
        "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
      );
     }

     const arrayProveedores=[];
     proveedor.data.forEach(item => {
      arrayProveedores.push({
        id: item.id,
        nombre: item.perfil.nombre + " "+ item.perfil.apellido,
        email: item.perfil.email,
        telefono: item.perfil.telefono,
        direccion: item.perfil.direccion,
        saldo: 0,
        estado: "activo",
        //colocar una funcion ciclica cada dos meses para que verificar
      });
     });

    return arrayProveedores;
}
const findOne = async (id) => {
    const proveedor = await apiContable.get(`/proveedores/findOne/${id}`);
    if(proveedor.status!=200){
      throw boom.notFound(
        "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
      );     }
    return {
      id: proveedor.data.data.id,
      nombre: proveedor.data.perfil.nombre + " "+ proveedor.data.perfil.apellido,
      email: proveedor.data.perfil.email,
      telefono: proveedor.data.perfil.telefono,
      direccion: proveedor.data.perfil.direccion,
      saldo: 0,
      estado: "activo",
    };
} */
const createSales = async (data) => {
  const { id_order, items } = data;

  //buscar la orden de la venta asi pueda obtener el precio de los productos
  const orderProducts = await orderProduct.findAll({
    where: {
      id_order: id_order,
    },
  });
  //acumlador de la orden
  const acumuladorOrderProduct = orderProducts.reduce(
    (acumulador, item) => acumulador + parseFloat(item.precio),
    0
  );
  //acumulador de las ventas
  const acumuladorSales = items.reduce(
    (acumulador, item) => acumulador + parseFloat(item.amount),
    0
  );
  //validar que la suma de los productos sea igual al total de la orden
  if (acumuladorOrderProduct !== acumuladorSales) {
    throw boom.badRequest(
      "La suma de los productos no coincide con el total de la orden",
      {
        acumuladorOrderProduct,
        acumuladorSales,
      }
    );
  }
  //crear las ventas
  const newSales = items.map((item) => {
    Sales.create({
      id_order: id_order,
      amount: item.amount,
      id_cuenta: item.id_cuenta,
    });

    return {
      id_order: id_order,
      amount: item.amount,
      id_cuenta: item.id_cuenta,
    };
  });

  //crear asiento contable
  const asiento = [
    {
      monto: acumuladorSales,
      tipo: "debe",
      cuentaSucursalId: 1,
    },
  ];
  /* createVenta(newSales); */
  return newSales;
};

/* const EditProveedor = async (id, body) => {
    const proveedor = await apiContable.patch(`/proveedores/${id}`,body);
    if(proveedor.status!=200){
      throw boom.notFound(
        "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
      );     }
    return proveedor.data;
}
const deleteProveedor = async (id) => {
    const proveedor = await apiContable.delete(`/proveedores/${id}`);
    if(proveedor.status!=200){
      throw boom.notFound(
        "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
      );     }
    return proveedor.data;
} */

module.exports = {
  createSales,
};
