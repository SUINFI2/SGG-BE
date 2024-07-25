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
    id_mesa: id_mesa.required(),
    typeShipping: typeShipping.required(),
    id_user: id_user.required(),
    id_state: id_state.required(),
    sucursalId: sucursalId.required(),
    personas: personas,
    clientes: clientes,
    comentario: comentario,
    items: joi.array().items(createItemOrderProduct)
})

const updatePedidoSchema = joi.object({
    id_mesa: id_mesa,
    typeShipping: typeShipping,
    id_state: id_state,

})
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