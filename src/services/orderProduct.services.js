const boom = require('@hapi/boom');
const models = require('../models');
const { findOne } = require('../services/productos.services');

async function findAll() {
    try {
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
        await Promise.all(response.map(async (item) => {
            const producto = await findOne(item.id_prduct);
            item.dataValues.producto = {
                nombre: producto.nombre
            };
        }));
        return response;
    } catch (error) {
        throw boom.internal("Error al obtener los orderProduct", error);
    }
}

module.exports = {
    findAll
};
