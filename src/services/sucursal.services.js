const boom = require("@hapi/boom");
const models = require("../models");
const { v4: uuidv4 } = require('uuid');

const { Association } = require("sequelize");
const apiInventario = require("../module/apiInventario");
const apiContable = require("../module/apiContable");

const { token } = require("morgan");
async function generarTokenId() {
  let tokenId;
  let unique = false;


  while (!unique) {
    tokenId = uuidv4(); // Genera un token único
    try {
      const sucursal = await models.Sucursal.findByPk(tokenId);
      if (!sucursal) {
        unique = true;
      }
    } catch (error) {
      console.error('Error while checking unique token ID:', error);
      throw new Error('Error while generating unique token ID');
    }
  }

  return tokenId;
}



async function findAll() {

  const response = await models.Sucursal.findAll();
  if (!response) {
    throw boom.notFound("Sucursal not found");
  }
  return response;
}
async function findOne(id) {
  const response = await await models.Sucursal.findByPk(id, {
    include: [
      {
        model: models.Sucursal,
      },
    ],
  });
  if (!response) {
    throw boom.notFound("Sucursal not found");
  }
  return response;
}
async function create(data) {

  const tokenId = await generarTokenId();
  const response = await models.Sucursal.create({
    id: tokenId,
    ...data,
  });
  if (!response) {
    throw boom.badRequest("Negocio not created");
  }
  const rta = await apiInventario.post(`/negocios/`, response.dataValue);
  const rta2 = await apiContable.post(`/negocios/`, response.dataValue);

  return response;
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
  create,
  update,
  remove,
};
