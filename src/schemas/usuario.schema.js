const joi = require('joi');

const id = joi.number().integer();
const usuario = joi.string().min(3).max(50);
const password = joi.string().min(3).max(50);
const name = joi.string().min(3).max(50);
const apellido = joi.string().min(3).max(50);
const rolId = joi.number().integer();
const limit = joi.number().integer();
const offset = joi.number().integer();
const email = joi.string().email();


const createUsuarioSchema = joi.object({
    usuario: usuario.required(),
    password: password.required(),
    name: name.required(),
    apellido: apellido.required(),
    rolId: rolId.required(),
    email: email.required()
})
const updateUsuarioSchema = joi.object({
    usuario: usuario,
    password: password,
    name: name,
    apellido: apellido,
    rolId: rolId,
    email: email
})
const getUsuarioSchema = joi.object({
    usuarioId: id.required()
})
const getUsuariosSchema = joi.object({
})

module.exports = {
    createUsuarioSchema,
    updateUsuarioSchema,
    getUsuarioSchema,
    getUsuariosSchema
}