const boom = require('@hapi/boom');
const models = require('../models');
const { Association } = require('sequelize');

async function findAll() {
    const response = await models.Order.findAll({
        include: [
            {
                model: models.User,
                attributes: ['id_user', 'name']
            },
            {
                model: models.Table,
                attributes: ['number']
            },
            {
                model: models.State,
                attributes: ['name']
            }
        ]
    })
    if (!response) {
        throw boom.notFound('Pedido not found')
    }
    return response
}
async function findOne(id) {
    const response = await models.Order.findByPk(id, {
        include: [
            {
                model: models.User,
                attributes: ['id_user', 'name']
            },
            {
                model: models.Table,
                attributes: ['number']
            },
            {
                model: models.State,
                attributes: ['name']
            }
        ]
    })
    if (!response) {
        throw boom.notFound('Pedido not found')
    }
    return response
}
async function create(data) {
    const response = await models.Order.create(data)
    if (!response) {
        throw boom.badRequest('Pedido not created')
    }
    return response
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
        where: { id_order: id }
    })
    if (!response) {
        throw boom.badRequest('Pedido not deleted')
    }
    return response
}
module.exports = {
    findAll,
    findOne,
    create,
    update,
    remove
}