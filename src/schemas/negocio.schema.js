const joi = require('joi');

const id = joi.number().integer();
const Negocio = joi.string().min(3).max(50);
const password = joi.string().min(3).max(50);
const name = joi.string().min(3).max(50);
const apellido = joi.string().min(3).max(50);
const rolId = joi.number().integer();
const limit = joi.number().integer();
const offset = joi.number().integer();
const email = joi.string().email();


const createNegocioSchema = joi.object({
   
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