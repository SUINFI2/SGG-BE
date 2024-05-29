const joi = require('joi');

const id = joi.number().integer();
const usuario = joi.string().min(3).max(50);
const password = joi.string().min(3).max(50);
const nombre = joi.string().min(3).max(50);
const apellido = joi.string().min(3).max(50);
const rolId = joi.number().integer();
const limit = joi.number().integer();
const offset = joi.number().integer();


const createUsuarioSchema = joi.object({
    usuario: usuario.required(),
    password: password.required(),
    nombre: nombre.required(),
    apellido: apellido.required(),
    rolId: rolId.required()
})
const updateUsuarioSchema = joi.object({
    usuario: usuario,
    password: password,
    nombre: nombre,
    apellido: apellido,
    rolId: rolId
})
const getUsuarioSchema = joi.object({
    usuarioId: id.required()
})
const getUsuariosSchema = joi.object({
    limit: limit.required(),
    offset: offset.required(),
    rolId
})

module.exports = {
    createUsuarioSchema,
    updateUsuarioSchema,
    getUsuarioSchema,
    getUsuariosSchema
}