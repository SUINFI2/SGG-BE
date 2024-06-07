const boom = require('@hapi/boom');
const models = require('../models');
const { Association } = require('sequelize');


async function findAll() {
    const response = await models.Table.findAll({
        include: [
            {
                model: models.User,
                attributes: ['id_user', 'name']
            },
            {
                model: models.State,
                attributes: ['name']
            }
        ],
    });
    if (!response) {
        throw boom.notFound('Table not found');
    }
    return response;
}
async function findOne(id) {
    const response = await models.Table.findByPk(id, {
        include: [
            {
                model: models.User,
                attributes: ['id_user', 'name']
            },
            {
                model: models.State,
                attributes: ['name']
            }
        ],
    });
    if (!response) {
        throw boom.notFound('Table not found');
    }
    return response;
}
async function create(data) {
    const response = await models.Table.create(data);
    if (!response) {
        throw boom.badRequest('Table not created');
    }
    return response;
}
async function update(id, body) {
    const response = await models.Table.update(body, {
        where: { id_mesa: id }
    });
    if (response[0] === 0) {
        throw boom.badRequest('Table not updated');
    }
    return response;
}
async function remove(id) {
    const response = await models.Table.destroy({
        where: { id_mesa: id }
    });
    if (!response) {
        throw boom.badRequest('Table not deleted');
    }
    return response;

}
module.exports = {
    findAll,
    findOne,
    create,
    update,
    remove
}