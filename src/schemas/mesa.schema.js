const joi = require('joi');

const id = joi.number().integer();
const numeroMesa = joi.number().integer();
const estadoId = joi.number().integer();
const usuarioId = joi.number().integer();
const limit = joi.number().integer();
const offset = joi.number().integer();

const createMesaSchema = joi.object({
    numeroMesa: numeroMesa.required(),
    estadoId: estadoId.required(),
    usuarioId: usuarioId.required()
})

const updateMesaSchema = joi.object({
    numeroMesa: numeroMesa,
    estadoId: estadoId,
    usuarioId: usuarioId
})

const getMesaSchema = joi.object({
    mesaId: id.required()
})
const getMesasSchema = joi.object({
    limit: limit.required(),
    offset: offset.required()
})

module.exports = {
    createMesaSchema,
    updateMesaSchema,
    getMesaSchema,
    getMesasSchema
}