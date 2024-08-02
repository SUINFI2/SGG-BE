const { query } = require("express");
const { Sales, orderProduct } = require("../models");
const sales = require("../models/sales");
const apiContable = require("../module/apiContable");
const boom = require("@hapi/boom");
const { createVenta } = require("./contabilidad.services");
const { getSucursalCuentasOne } = require("./sucursalCuentas.services");
const models = require("../models");

const createSales = async (data) => {
  const { id_order, items, sucursalId } = data;

  // Buscar la orden de la venta para obtener el precio de los productos
  const orderProducts = await models.OrderProduct.findAll({
    where: {
      id_order: id_order,
    },
  });

  // Acumulador de la orden
  const acumuladorOrderProduct = orderProducts.reduce(
    (acumulador, item) => acumulador + parseFloat(item.precio),
    0
  );

  // Acumulador de las ventas
  const acumuladorSales = items.reduce(
    (acumulador, item) => acumulador + parseFloat(item.amount),
    0
  );

  // Validar que la suma de los productos sea igual al total de la orden
  if (acumuladorOrderProduct !== acumuladorSales) {
    throw boom.badRequest(
      "La suma de los productos no coincide con el total de la orden",
      {
        acumuladorOrderProduct,
        acumuladorSales,
      }
    );
  }

  // Crear las ventas
  const newSales = items.map(async (item) => {
    await models.Sales.create({
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

  // Actualizar el estado del pedido y quitar la mesa
  const order = await models.Order.findByPk(id_order);
  if (order) {
    await models.Order.update(
      { id_mesa: null, id_state: 1 },
      { where: { id_order: id_order } }
    );
  }

  // Obtener cuenta para el asiento contable
  const cuentaOne = await getSucursalCuentasOne({
    sucursalId: sucursalId,
    codigo: "1.1.3",
    sucursalCuentaId: null
  });

  const array = items.map((item) => ({
    cuentaSucursalId: Number(item.id_cuenta),
    monto: Number(item.amount),
    tipo: "debe",
  }));

  array.push({
    cuentaSucursalId: cuentaOne.id,
    monto: acumuladorSales,
    tipo: "haber",
  });

  console.log("asiento", array);

  // Crear asiento contable
  //await createVenta(array);

  return newSales;
};


module.exports = {
  createSales,
};
