const joi = require('joi');

const id = joi.number().integer();
const nombre = joi.string().min(3).max(50);


const createRolSchema = joi.object({
    nombre: nombre.required()
})
const updateRolSchema = joi.object({
    nombre: nombre
})
const getRolSchema = joi.object({
    rolId: id.required()
})
const getRolesSchema = joi.object({
    limit: id.required(),
    offset: id.required()
})

module.exports = {
    createRolSchema,
    updateRolSchema,
    getRolSchema,
    getRolesSchema
}