const boom = require('@hapi/boom');
const models = require('../models');
const { Association } = require('sequelize');


async function findAll() {
    const response = await models.Table.findAll({
        include: [
            {
                model: models.User,
                attributes: ['id_user', 'name'],
                include: [
                    {
                        model: models.Sucursal,
                        attributes: ['id', 'nombre', 'direccion'],
                    }
                ]
            },
            {
                model: models.State,
                attributes: ['name']
            }
        ],
    });

    if (!response || response.length === 0) {
        throw new Error('Mesas no encontradas');
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
async function create(mesaData) {
    const { id_user, id_state, number } = mesaData;

    const user = await models.User.findByPk(id_user);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const newTable = await models.Table.create({
        id_user,
        id_state,
        number,
    });

    return newTable;
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