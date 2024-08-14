const Joi = require('joi');

const id_rol = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createRolSchema = Joi.object({
    name: name.required()
});
const updateRolSchema = Joi.object({
    name: name.required(),
});
const getRolSchema = Joi.object({
    rolId: id_rol.required()
});
const getRolesSchema = Joi.object({
    limit,
    offset
});

module.exports = {
    createRolSchema,
    updateRolSchema,
    getRolSchema,
    getRolesSchema
};
