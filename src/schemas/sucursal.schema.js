const joi = require('joi');

const id = joi.number().integer();
const nombre = joi.string().min(3).max(50);
const negocioId = joi.string();
const limit = joi.number().integer();
const offset = joi.number().integer();
const email = joi.string().email();


const createSucursalSchema = joi.object({
    nombre: nombre.required(),
    direccion: joi.string().min(3).max(50).required(),
    negocioId: negocioId.required()
})
const updateSucursalSchema = joi.object({

})
const getSucursalSchema = joi.object({
    sucursalId: id.required()
})
const getSucursalsSchema = joi.object({
})

module.exports = {
    createSucursalSchema,
    updateSucursalSchema,
    getSucursalSchema,
    getSucursalsSchema
}