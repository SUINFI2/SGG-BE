const joi = require('joi');

const id = joi.number().positive();
const nombre = joi.string();

const createEstadoSchema = joi.object({
    nombre: nombre.required()
})

const updateEstadoSchema = joi.object({
    nombre: nombre
})
const getEstadoSchema = joi.object({
    estadoId: id.required()
})

const getEstadosSchema = joi.object({
    limit: id.required(),
    offset: id.required()
})
module.exports = {
    createEstadoSchema,
    updateEstadoSchema,
    getEstadoSchema,
    getEstadosSchema
}
