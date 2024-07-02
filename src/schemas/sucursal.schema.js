const joi = require('joi');

const id = joi.number().integer();
const Sucursal = joi.string().min(3).max(50);
const password = joi.string().min(3).max(50);
const name = joi.string().min(3).max(50);
const apellido = joi.string().min(3).max(50);
const rolId = joi.number().integer();
const limit = joi.number().integer();
const offset = joi.number().integer();
const email = joi.string().email();


const createSucursalSchema = joi.object({
   
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