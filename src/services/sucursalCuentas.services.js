const boom = require("@hapi/boom");
const models = require("../models");
const { v4: uuidv4 } = require("uuid");

const { Association } = require("sequelize");
const apiInventario = require("../module/apiInventario");
const apiContable = require("../module/apiContable");

async function getSucursalCuentas(sucursalId, codigo) {
  const response = await apiContable.get(
    `/sucursales-cuentas/findAll?sucursalId=${sucursalId}&codigo=${codigo}`
  );

  if (!response) {
    throw boom.notFound("Sucursal not found");
  }
  return response.data;
}

module.exports = {
  getSucursalCuentas,
};
