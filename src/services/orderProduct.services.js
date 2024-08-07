const boom = require('@hapi/boom');
const models = require('../models');
const { findOne } = require('../services/productos.services');

async function findAll(query = {}) {
    const { sucursalId } = query;

    try {
        const response = await models.OrderProduct.findAll({
            include: [
                {
                    model: models.Order,
                    attributes: ['comentario', 'sucursalId'],
                    where: sucursalId ? { sucursalId } : {},
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

        await Promise.all(
            response.map(async (item) => {
                const producto = await findOne(item.id_prduct);
                if(!producto){
                    return response;
                }
                item.dataValues.producto = {
                    nombre: producto.nombre
                };
            })
        );

        return response;
    } catch (error) {
        throw boom.internal("Error al obtener los orderProducts", error);
    }
}
async function update(id, body) {
    try {
        const [updatedRows] = await models.OrderProduct.update(body, { 
            where: { id_orderProduct: id }
        });
        if (updatedRows === 0) {
            throw new Error('No se encontró el orderProduct o no se realizaron cambios');
        }
        const updatedOrderProduct = await models.OrderProduct.findOne({ where: { id_orderProduct: id } });

        return {
            message: 'OrderProduct actualizado exitosamente',
            data: updatedOrderProduct
        };
    } catch (error) {

        throw new Error(`Error al actualizar el OrderProduct: ${error.message}`);
    }
}


module.exports = {
    findAll,
    update
};
