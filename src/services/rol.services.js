const boom = require('@hapi/boom');
const models = require('../models');

async function findAll() {
    const response = await models.Role.findAll();
    if (!response) {
        throw boom.notFound('Role not found');
    }
    return response;
}
async function findOne(id) {
    const response = await models.Role.findByPk(id);
    if (!response) {
        throw boom.notFound('Role not found');
    }
    return response;
}
async function create(data) {
    const response = await models.Role.create(data);
    if (!response) {
        throw boom.badRequest('Role not created');
    }
    return response;
}
async function update(id, body) {
    const response = await models.Role.update(body, {
        where: { role_id: id }
    });
    if (response[0] === 0) {
        throw boom.badRequest('Role not updated');
    }
    return response;
}
async function remove(id) {
    const response = await models.Role.destroy({
        where: { role_id: id }
    });
    if (!response) {
        throw boom.badRequest('Role not deleted');
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