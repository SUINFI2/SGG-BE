const boom = require("@hapi/boom");
const models = require("../models");
const { Association } = require("sequelize");

const apiInventario = require("../module/apiInventario");
const apiContable = require("../module/apiContable");
const service = require("../services/productos.services");

async function findAll() {
  const response = await models.Order.findAll({
    include: [
      {
        model: models.User,
        attributes: ["id_user", "name"],
      },
      {
        model: models.Table,
        attributes: ["number"],
      },
      {
        model: models.State,
        attributes: ["name"],
      },
      {
        model: models.orderProduct,
      },
    ],
  });
  if (!response) {
    throw boom.notFound("Pedido not found");
  }
  return response;
}
async function findOne(id) {
  const response = await models.Order.findByPk(id, {
    include: [
      {
        model: models.User,
        attributes: ["id_user", "name"],
      },
      {
        model: models.Table,
        attributes: ["number"],
      },
      {
        model: models.State,
        attributes: ["name"],
      },
    ],
  });
  if (!response) {
    throw boom.notFound("Pedido not found");
  }
  return response;
}
async function create(data) {
  const { id_mesa, typeShipping, id_user, id_state, sucursalId, clientes, comentario, personas, items } = data;
  const dataOrder = {
    id_mesa,
    typeShipping,
    id_user,
    id_state,
    sucursalId,
    clientes,
    comentario,
    personas
  };
  const response = await models.Order.create(dataOrder);
  if (!response) {
    throw boom.badRequest("Pedido not created");
  }
  if (items) {
    await Promise.all(
      items.map(async (element) => {
        await models.orderProduct.create({
          ...element,
          id_order: response.id_order,
          id_prduct: element.id_product,
        });
      })
    );
  }

  return response;
}
async function update(id, body) {
  const response = await models.Order.update(body, {
    where: { id_order: id }
  })
  if (response[0] === 0) {
    throw boom.badRequest('Pedido not updated')
  }


  return response
}
async function remove(id) {
  const response = await models.Order.destroy({
    where: { id_order: id },
  });
  if (response === 0) {
    throw boom.badRequest("Pedido not deleted");
  }
  return {
    message: "Pedido eliminado",
    data: {
      id_order: id,
      deletedCount: response
    }
  };
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
};
