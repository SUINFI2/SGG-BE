const joi = require('joi');

const id = joi.number().integer();
const text = joi.string();
const number = joi.number().positive();
const limit = joi.number().integer();
const offset = joi.number().integer();


const createProveedorSchema = joi.object({
  
  negocioId: text.required(),
  nombre: text.required(),
  apellido: text.required(),
  cedula: number.required(),
  tipCedula: text.required(),
  razonSocial: text.required(),
  direccion: text.required(),

});

const updateProveedorSchema = joi.object({
  perfilId: id,
  cuentaId: id,
  negocioId: text
});
const getProveedorSchema = joi.object({
  proveedorId: id.required()
});
const queryProveedorSchema = joi.object({
  negocioId: text.required()
});



module.exports ={
  createProveedorSchema,
  updateProveedorSchema,
  getProveedorSchema,
  queryProveedorSchema
  };
