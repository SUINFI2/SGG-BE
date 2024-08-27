const joi = require('joi');

const id = joi.number().integer();
const tokenId= joi.string().max(36);
const Negocio = joi.string().min(3).max(50);
const password = joi.string().min(3).max(50);
const apellido = joi.string().min(3).max(50);
const rolId = joi.number().integer();
const limit = joi.number().integer();
const offset = joi.number().integer();
const email = joi.string().email();

const nombre = joi.string().min(3).max(50);
const direccion = joi.string().min(3).max(256);
const userId = joi.number().integer();
const createNegocioSchema = joi.object({
   nombre: nombre.required(),
   direccion: direccion.required(),
   userId: userId
})
const updateNegocioSchema = joi.object({
    nombre: nombre,
    direccion: direccion
})
const getNegocioSchema = joi.object({
    negocioId: tokenId.required()
})
const queryNegocioSchema = joi.object({
})

module.exports = {
    createNegocioSchema,
    updateNegocioSchema,
    getNegocioSchema,
    queryNegocioSchema
}