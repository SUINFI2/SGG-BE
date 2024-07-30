const { query } = require("express");
const { Sales, orderProduct } = require("../models");
const sales = require("../models/sales");
const apiContable = require("../module/apiContable");
const boom = require("@hapi/boom");
const { createVenta } = require("./contabilidad.services");
const { getSucursalCuentasOne } = require("./sucursalCuentas.services");

const createSales = async (data) => {
  const { id_order, items, sucursalId } = data;

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

  const cuentaOne = await getSucursalCuentasOne(sucursalId, "1.1.3");

  const array = newSales.map((item) => {
    return {
      cuentaSucursalId: Number(item.id_cuenta),
      monto: Number(item.amount),
      tipo: "debe",
    };
  });

  array.push({
    cuentaSucursalId: cuentaOne.id,
    monto: acumuladorSales,
    tipo: "haber",
  });

  console.log("asiento", array);
  //crear asiento contable
  //tengo que devolverle un tipo debe
  createVenta(array);
  return newSales;
};

module.exports = {
  createSales,
};
