const joi = require('joi');

const id = joi.number().integer();
const usuario = joi.string().min(3).max(50);
const password = joi.string().min(3).max(50);
const name = joi.string().min(3).max(50);
const apellido = joi.string().min(3).max(50);
const id_rol = joi.number().integer();
const active = joi.boolean(); // 0 o 1, true o false,
const sucursalId = joi.string().uuid();
const limit = joi.number().integer();
const offset = joi.number().integer();
const email = joi.string().email();
const idToken = joi.string().max(36).min(36);

const createUsuarioSchema = joi.object({
    usuario: usuario.required(),
    password: password.required(),
    name: name.required(),
    apellido: apellido.required(),
    id_rol: id_rol.required(),
    email: email.required(),
    sucursalId: sucursalId.required()
})
const updateUsuarioSchema = joi.object({
    usuario: usuario,
    password: password,
    name: name,
    apellido: apellido,
    id_rol: id_rol,
    email: email,
    active: active,
    sucursalId: sucursalId
})
const getUsuarioSchema = joi.object({
    usuarioId: id.required()
})
const getUsuariosSchema = joi.object({
    sucursalId: idToken,
    negocioId: idToken
})

module.exports = {
    createUsuarioSchema,
    updateUsuarioSchema,
    getUsuarioSchema,
    getUsuariosSchema
}