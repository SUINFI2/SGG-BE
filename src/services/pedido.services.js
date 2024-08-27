const boom = require("@hapi/boom");
const models = require("../models");
const { Association } = require("sequelize");

const apiInventario = require("../module/apiInventario");
const apiContable = require("../module/apiContable");
const service = require("../services/productos.services");
const { Op } = require('sequelize');

const { findOne: findProducto } = require('../services/productos.services');

async function findAll(query = {}) {
  try {
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
          model: models.OrderProduct,
        },
      ],
    });

    if (!response || response.length === 0) {
      // Devuelve un 200 OK con un mensaje personalizado cuando no hay pedidos
      return {
        statusCode: 200,
        message: "No hay pedidos disponibles",
      };
    }

    // Continúa con el procesamiento si se encontraron pedidos
    const updatedResponse = await Promise.all(
      response.map(async (item) => {
        try {
          if (item.Table === null && item.numero_mesa_finalizada) {
            const mesaFinalizada = await models.Table.findOne({
              attributes: ['id_mesa', 'number'],
              where: { id_mesa: item.numero_mesa_finalizada }
            });
            if (mesaFinalizada) {
              item.dataValues.id_mesa_finalizada = mesaFinalizada.id_mesa;
              item.dataValues.numero_mesa_finalizada = mesaFinalizada.number;
            }
          }
          const orderProducts = await Promise.all(
            item.OrderProducts.map(async (orderProduct) => {
              try {
                const productoId = Number(orderProduct.id_prduct);
                if (isNaN(productoId)) {
                  throw new Error(`ID del producto no válido: ${orderProduct.id_prduct}`);
                }

                const producto = await findProducto(productoId);
                if (producto && producto.nombre) {
                  orderProduct.dataValues.producto = {
                    nombre: producto.nombre,
                  };
                } else {
                  throw new Error('Nombre del producto no encontrado en la respuesta');
                }
              } catch (error) {
                orderProduct.dataValues.producto = {
                  nombre: "Desconocido",
                };
              }
              return orderProduct;
            })
          );

          item.dataValues.OrderProducts = orderProducts;
        } catch (error) {
        }
        return item;
      })
    );
    return updatedResponse;
  } catch (error) {
    throw boom.internal("Error al obtener los pedidos", error);
  }
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

  // Verificar si es un pedido en mesa (no "Take away" o "Delivery")
  if (typeShipping !== 'Take away' && typeShipping !== 'Delivery') {
    // Verificar si existe un pedido activo para la mesa
    const existingOrder = await models.Order.findOne({
      where: {
        id_mesa: id_mesa,
        id_state: {
          [Op.ne]: 7, // Verifica que el estado no sea 7 (pedido cerrado)
        },
      },
    });

    if (existingOrder) {
      throw boom.conflict("Ya existe un pedido activo para esta mesa");
    }
  }

  // Preparar los datos de la orden
  const dataOrder = {
    id_mesa: (typeShipping === 'Take away' || typeShipping === 'Delivery') ? null : id_mesa,
    typeShipping,
    id_user,
    id_state,
    sucursalId,
    clientes,
    comentario,
    personas
  };

  // Crear la orden
  const response = await models.Order.create(dataOrder);
  if (!response) {
    throw boom.badRequest("Pedido not created");
  }

  // Crear los productos de la orden si se especificaron
  if (items) {
    await Promise.all(
      items.map(async (element) => {
        await models.OrderProduct.create({
          ...element,
          id_order: response.id_order,
          id_prduct: element.id_product, // Asegúrate de que el campo sea "id_product" si es el correcto
        });
      })
    );
  }

  return response;
}

async function update(pedidoId, changes) {
  const { id_mesa, typeShipping, id_user, id_state, sucursalId, clientes, comentario, personas, items } = changes;

  const order = await models.Order.findByPk(pedidoId);
  if (!order) {
    throw boom.notFound("Pedido no encontrado");
  }
  const updatedOrder = await order.update({
    id_mesa: (typeShipping === 'Take away' || typeShipping === 'Delivery') ? null : id_mesa,
    typeShipping,
    id_user,
    id_state,
    sucursalId,
    clientes,
    comentario,
    personas
  });

  if (items) {
    for (const item of items) {
      if (item.id_orderProduct) {
        const orderProduct = await models.OrderProduct.findByPk(item.id_orderProduct);
        if (orderProduct) {
          await orderProduct.update({
            id_product: item.id_product,
            cnt: item.cnt,
            precio: item.precio,
          });
        }
      } else {
        // Crea un nuevo producto si no existe
        await models.OrderProduct.create({
          id_order: pedidoId,
          id_prduct: item.id_product,
          cnt: item.cnt,
          precio: item.precio,
        });
      }
    }
  }
  return updatedOrder;
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
