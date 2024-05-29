const joi = require('joi');

const id = joi.number().positive();
const mesaId = joi.number().positive();
const tipoEnvio = joi.string()

const createPedidoSchema = joi.object({
    mesaId: mesaId.required(),
    tipoEnvio: tipoEnvio.required()
})


const updatePedidoSchema = joi.object({
    mesaId: mesaId,
    tipoEnvio: tipoEnvio
})
const getPedidoSchema = joi.object({
    pedidoId: id.required()
})

const getPedidosSchema = joi.object({
    mesaId: mesaId
})
module.exports = {
    createPedidoSchema,
    updatePedidoSchema,
    getPedidoSchema,
    getPedidosSchema
}