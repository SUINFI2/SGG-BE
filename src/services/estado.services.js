const boom = require('@hapi/boom');
const models = require('../models');

async function findAll() {
    const response = await models.State.findAll();
    if (!response) {
        throw boom.notFound('Usuario not found');
    }
    return response;
}
async function findOne(id) {
    const response = await models.State.findByPk(id);
    if (!response) {
        throw boom.notFound('State not found');
    }
    return response;
}
async function create(data) {
    const response = await models.State.create(data);
    if (!response) {
        throw boom.badRequest('State not created');
    }
    return response;
}
async function update(id, body) {
    const response = await models.State.update(body, {
        where: { id_state: id }
    });
    if (response[0] === 0) {
        throw boom.badRequest('State not updated');
    }
    return response;
}
async function remove(id) {
    const response = await models.State.destroy({
        where: { id_state: id }
    });
    if (!response) {
        throw boom.badRequest('State not deleted');
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