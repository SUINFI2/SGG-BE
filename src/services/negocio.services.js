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
        const negocio = await models.Negocio.findByPk(tokenId);
        if (!negocio) {
          unique = true;
        }
    }
  
    return tokenId;
  }

async function findAll() {

  const response = await models.Negocio.findAll();
  if (!response) {
    throw boom.notFound("Negocio not found");
  }
  return response;
}
async function findOne(id) {
  const response = await await models.Negocio.findByPk(id, {
    include: [
      {
        model: models.Sucursal,
      },
    ],
  });
  if (!response) {
    throw boom.notFound("Negocio not found");
  }
  return response;
}
async function create(data) {

  const tokenId = await this.generarTokenId();
  const response = await models.Negocio.create({
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

  const negocio = await this.findOne(id);
  const response = await negocio.update(body);
  if (!response) {
    throw boom.badRequest("Negocio not updated");
  }

  const rta = await apiInventario.patch(`/negocios/${id}`, body);
  const rta2 = await apiContable.patch(`/negocios/${id}`, body);

  return response;
}
async function remove(id) {
  const negocio = await this.findOne(id);
  const response = await negocio.destroy();
  if (!response) {
    throw boom.badRequest("Negocio not deleted");
  }
  const rta = await apiInventario.delete(`/negocios/${id}`);
  const rta2 = await apiContable.delete(`/negocios/${id}`);
  
  return response;
}
module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
};
