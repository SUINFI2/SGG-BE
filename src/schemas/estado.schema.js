const joi = require('joi');

const id = joi.number().positive();
const name = joi.string();

const createEstadoSchema = joi.object({
    name: name.required()
})

const updateEstadoSchema = joi.object({
    name: name
})
const getEstadoSchema = joi.object({
    estadoId: id.required()
})

const getEstadosSchema = joi.object({
})
module.exports = {
    createEstadoSchema,
    updateEstadoSchema,
    getEstadoSchema,
    getEstadosSchema
}
