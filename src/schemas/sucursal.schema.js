const joi = require('joi');

const id = joi.number().integer();
const Sucursal = joi.string().min(36).max(36);
const password = joi.string().min(3).max(50);
const name = joi.string().min(3).max(50);
const apellido = joi.string().min(3).max(50);
const rolId = joi.number().integer();
const limit = joi.number().integer();
const offset = joi.number().integer();
const email = joi.string().email();
const id_negocio=joi.string().min(36).max(36);
const nombre = joi.string().min(3).max(56);
const direccion = joi.string().min(3).max(156);

const createSucursalSchema = joi.object({
   id_negocio: id_negocio.required(),
   nombre: nombre.required(),
   direccion: direccion.required(),
})
const updateSucursalSchema = joi.object({
    nombre: nombre,
    direccion: direccion,
})
const getSucursalSchema = joi.object({
    sucursalId: Sucursal.required()
})
const querySucursalSchema = joi.object({
})

module.exports = {
    createSucursalSchema,
    updateSucursalSchema,
    getSucursalSchema,
    querySucursalSchema
}