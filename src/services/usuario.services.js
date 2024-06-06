const boom = require('@hapi/boom');
const models = require('../models');
const { Association } = require('sequelize');


async function findAll() {
    const response = await models.User.findAll();
    if (!response) {
        throw boom.notFound('Usuario not found');
    }
    return response;
}
async function findOne(id) {
    const response = await models.User.findByPk(id, {
        include: [{
            Association: 'role',
            attributes: ['name', 'role_id']
        }],
    });
    if (!response) {
        throw boom.notFound('Usuario not found');
    }
    return response;
}
async function create(data) {
    const response = await models.User.create(data);
    if (!response) {
        throw boom.badRequest('Usuario not created');
    }
    return response;
}
async function update(id, body) {
    const response = await models.User.update(body, {
        where: { id_user: id }
    });
    if (response[0] === 0) {
        throw boom.badRequest('Usuario not updated');
    }
    return response;
}
async function remove(id) {
    const response = await models.User.destroy({
        where: { id_user: id }
    });
    if (!response) {
        throw boom.badRequest('Usuario not deleted');
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
