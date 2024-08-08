const joi = require('joi');

const id = joi.number().positive();
const id_mesa = joi.number().positive();
const typeShipping = joi.string();
const id_user = joi.number().positive();
const id_state = joi.number().positive();
const sucursalId = joi.string().uuid();
const personas = joi.number().positive();
const clientes = joi.string();
const comentario = joi.string();

const createItemOrderProduct = joi.object({
    id_product: joi.number().positive(),
    cnt: joi.number().positive(),
    precio: joi.number().positive(),
});

const createPedidoSchema = joi.object({
    id_mesa: joi.when('typeShipping', {
        is: joi.string().valid('Take away', 'Delivery'),
        then: id_mesa.optional().allow(null),
        otherwise: id_mesa.required()
      }),
    typeShipping: typeShipping.required(),
    id_user: id_user.required(),
    id_state: id_state.required(),
    sucursalId: sucursalId.required(),
    personas: personas,
    clientes: clientes,
    comentario: comentario,
    items: joi.array().items(createItemOrderProduct)
})
const updateItemOrderProduct = joi.object({
    id_orderProduct: joi.number().optional(),
    id_product: joi.number().positive(),
    cnt: joi.number().positive(),
    precio: joi.number().positive(),
});
const updatePedidoSchema = joi.object({
    id_mesa: joi.when('typeShipping', {
        is: joi.string().valid('Take away', 'Delivery'),
        then: id_mesa.optional().allow(null),
        otherwise: id_mesa.required()
    }),
    typeShipping: typeShipping.required(),
    id_user: id_user.optional(),
    id_state: id_state.optional(),
    sucursalId: sucursalId.optional(),
    personas: personas.optional(),
    clientes: clientes.optional(),
    comentario: comentario.optional(),
    items: joi.array().items(updateItemOrderProduct).optional(),
});
const getPedidoSchema = joi.object({
    pedidoId: id.required()
})

const getPedidosSchema = joi.object({
    id_mesa: id_mesa
})
module.exports = {
    createPedidoSchema,
    updatePedidoSchema,
    getPedidoSchema,
    getPedidosSchema
}