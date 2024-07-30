const boom = require('@hapi/boom');
const models = require('../models');

async function findAll() {
    const response = await models.orderProduct.findAll({
        include: [
            {
                model: models.Order,
                attributes: ['comentario'],
                include: [
                    {
                        model: models.Table,
                        attributes: ['id_mesa'],
                        include: [
                            {
                                model: models.User,
                                attributes: ['id_user', 'name']
                            },
                            {
                                model: models.State,
                                attributes: ['name', 'id_state']
                            }
                        ]
                    }
                ]
            }
        ],
    });
    if (!response) {
        throw boom.notFound('orderProduct not found');
    }
    return response;
}



module.exports = {
    findAll
}