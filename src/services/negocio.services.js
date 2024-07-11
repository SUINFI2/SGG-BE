const boom = require("@hapi/boom");
const models = require("../models");
const { v4: uuidv4 } = require('uuid');

const { Association } = require("sequelize");
const apiInventario = require("../module/apiInventario");
const apiContable = require("../module/apiContable");
const sucursalService = require("./sucursal.services");

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

  //falta verificara con el baack de contabilidad

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
  try {
    const tokenId = await generarTokenId();

    const createdNegocio = await models.Negocio.create({
      id: tokenId,
      ...data,
    });

    if (!createdNegocio) {
      throw boom.badRequest("Negocio not created");
    }

    // Sincronización con otros sistemas
    // const rta1 = await apiInventario.post(`/negocios/`, createdNegocio.dataValues);
    // const rta2 = await apiContable.post(`/negocios/`, createdNegocio.dataValues);

    // Creación automática de la sucursal
    const sucursalData = {
      nombre: "Sucursal Principal",
      direccion: createdNegocio.direccion,
      negocioId: tokenId,
    };
    const createdSucursal = await sucursalService.create(sucursalData);

    // const categorias = ["Bebidas", "Hamburguesas", "Postres"];

    // for (const categoria of categorias) {
    //   const categoriaData = {
    //     nombre: categoria,
    //     negocioId: tokenId,
    //   };
    //   await apiInventario.post(`/categorias/`, categoriaData);
    // }

    if (!createdSucursal) {
      throw boom.badRequest("Sucursal not created");
    }

    return createdNegocio;
  } catch (error) {
    console.error("Error creating Negocio:", error);
    throw boom.badRequest("Error creating Negocio");
  }
}

async function update(id, body) {

  const negocio = await this.findOne(id);
  const response = await negocio.update(body);
  if (!response) {
    throw boom.badRequest("Negocio not updated");
  }
  // propagar los cambios de los diferentes backs
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
  // propagar en los diferentes negocios? 
  const rta = await apiInventario.delete(`/negocios/${id}`);
  const rta2 = await apiContable.delete(`/negocios/${id}`);

  //implementar rollback por si ocurre un error

  return response;
}
module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
};
