const boom = require("@hapi/boom");
const models = require("../models");
const { v4: uuidv4 } = require("uuid");

const { Association } = require("sequelize");
const apiInventario = require("../module/apiInventario");
const apiContable = require("../module/apiContable");

async function generarTokenSucursalId() {
  let tokenId;
  let unique = false;

  while (!unique) {
    tokenId = uuidv4(); // Genera un token único

    const negocio = await apiContable.get(`/sucursales/findOne/${tokenId}`);
    if (negocio.data.statusCode == 404) {
      unique = true;
    }
  }

  return tokenId;
}

async function findAll(query) {
  const { negocioId } = query;
  let options = { where: { negocioId } };

  const response = await models.Sucursal.findAll(options);
  if (!response) {
    throw boom.notFound("Sucursal not found");
  }
  return response;
}
async function findOne(id) {
  const response = await await models.Sucursal.findByPk(id);
  if (!response) {
    throw boom.notFound("Sucursal not found");
  }
  return response;
}

async function createSucursal(data) {
  // create sucursales
  const tokenId = await generarTokenSucursalId();
  console.log("fin generar token sucursal");

  console.log(data);
  //gastronomia
  const sucursalGastronomica = await models.Sucursal.create({
    id: tokenId,
    nombre: data.nombre,
    direccion: data.direccion,
    negocioId: data.negocioId,
  });


  if (!sucursalGastronomica) {
    // rollaback inventarios
    // rollback contabilidad
    throw boom.notFound("Sucursal not found in inventario");
  }
  console.log("fin sucursal gastronomia");

  //contabilidad
  const sucursalContable = await apiContable.post(`/sucursales/`, {
    id: tokenId,
    nombre: data.nombre,
    direccion: data.direccion,
    negocioId: data.negocioId,
  });
  if (sucursalContable.data.statusCode == 404) {
    console.log(sucursalContable.data);
    throw boom.notFound("Sucursal not found in contabilidad");
  }
  console.log("fin sucursal contabilidad");

  //inventarios
  const sucursalInventario = await apiInventario.post(`/sucursales/`, {
    id: tokenId,
    nombre: data.nombre,
    direccion: data.direccion,
    negocioId: data.negocioId,
  });
  if (sucursalInventario.data.statusCode == 404) {
    console.log(sucursalInventario.data);
    // rollback contabilidad
    throw boom.notFound("Sucursal not found in inventario");
  }
  console.log("fin sucursal invetarios");

  return sucursalGastronomica;
}
async function update(id, body) {
  const Sucursal = await this.findOne(id);
  const response = await Sucursal.update(body);
  if (!response) {
    throw boom.badRequest("Sucursal not updated");
  }

  const rta = await apiInventario.patch(`/sucursal/${id}`, body);
  const rta2 = await apiContable.patch(`/sucursal/${id}`, body);

  return response;
}
async function remove(id) {
  const Sucursal = await this.findOne(id);
  const response = await Sucursal.destroy();
  if (!response) {
    throw boom.badRequest("Sucursal not deleted");
  }
  const rta = await apiInventario.delete(`/sucursal/${id}`);
  const rta2 = await apiContable.delete(`/sucursal/${id}`);

  return response;
}
module.exports = {
  findAll,
  findOne,
  update,
  remove,
  createSucursal,
};
