const boom = require("@hapi/boom");
const models = require("../models");
const { v4: uuidv4 } = require("uuid");

const { Association } = require("sequelize");
const apiInventario = require("../module/apiInventario");
const apiContable = require("../module/apiContable");

const { createSucursal } = require("./sucursal.services");

async function generarTokenId() {
  let tokenId;
  let unique = false;

  while (!unique) {
    tokenId = uuidv4(); // Genera un token único

    const negocio = await apiContable.get(`/negocios/findOne/${tokenId}`);
    if (negocio.data.statusCode == 404) {
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
  const tokenId = await generarTokenId();
  console.log("antes de todo");
  // create negocios
  // contabilidad
  const negocioContable = await apiContable.post(`/negocios/`, {
    id: tokenId,
    nombre: data.nombre,
    direccion: data.direccion,
  });
  if (negocioContable.data.statusCode == 404) {
    console.log(negocioContable.data);
    throw boom.notFound("Negocio not found in contabilidad");
  }
  console.log("negocio creado en contabilidad");
  //inventarios
  const negocioInventario = await apiInventario.post(`/negocios/`, {
    id: tokenId,
    nombre: data.nombre,
    direccion: data.direccion,
  });
  if (negocioInventario.data.statusCode == 404) {
    console.log(negocioInventario.data);
    //rollback in contabilidad
    throw boom.notFound("Negocio not found in inventarios");
  }
  console.log("negocio creado en inventarios");
  // gastronomia
  const negocioGastronomico = await models.Negocio.create({
    id: tokenId,
    ...data,
  });
  if (!negocioGastronomico) {
    // rollback inventarios
    // rollaback contabilidad
    throw boom.badRequest("Negocio not created");
  }
  console.log("negocio creado en gastronomia");

  const sucursal = await createSucursal({
    negocioId: tokenId,
    nombre: data.nombre,
    direccion: data.direccion,
  });
  if (!sucursal) {
    //implementar rollbacks
    throw boom.notFound("sucursal not found");
  }

  
  // categorias por default

  const categoriasStandar = [
    { nombre: "Bebidas", codigo: "1" },
    { nombre: "Cafetería", codigo: "2" },
    { nombre: "Comida", codigo: "3" },
  ];
  for (const categoria of categoriasStandar) {
    const rta = await apiInventario.post(`/categorias/`, {
      ...categoria,
      negocioId: tokenId,
    });
  }


  return {negocio: negocioGastronomico,
      sucursal: sucursal
  };
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
