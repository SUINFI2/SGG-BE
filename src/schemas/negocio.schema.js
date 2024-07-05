const joi = require('joi');

const id = joi.string().uuid();
const nombre = joi.string().min(3).max(50);
const direccion = joi.string().min(3).max(50);

const limit = joi.number().integer();
const offset = joi.number().integer();



const createNegocioSchema = joi.object({
    nombre: nombre.required(),
    direccion: direccion.required()
})
const updateNegocioSchema = joi.object({

})
const getNegocioSchema = joi.object({
    negocioId: id.required()
})
const getNegociosSchema = joi.object({
})

module.exports = {
    createNegocioSchema,
    updateNegocioSchema,
    getNegocioSchema,
    getNegociosSchema
}