const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(3).max(50);
const limit = joi.number().integer();
const offset = joi.number().integer();


const createRolSchema = joi.object({
    name: name.required()
})
const updateRolSchema = joi.object({
    nombre: name
})
const getRolSchema = joi.object({
    rolId: id.required()
})
const getRolesSchema = joi.object({
    limit,
    offset
})

module.exports = {
    createRolSchema,
    updateRolSchema,
    getRolSchema,
    getRolesSchema
}