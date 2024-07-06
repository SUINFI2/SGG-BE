const joi = require('joi');

const id = joi.number().integer();
const limit = joi.number().integer();
const offset = joi.number().integer();
const text = joi.string();
const number = joi.number().positive();


const createCuentaSchema = joi.object({
  nombre: text.required(),
  tipo: text.required(),
  codigo: text.required(),
  negocioId: text.required()
});

const updateCuentaSchema = joi.object({
  nombre: text,
  tipo: text,
  codigo: text
});
const getCuentaSchema = joi.object({
  cuentaId: id.required()
});

const queryCuentaSchema = joi.object({
  negocioId: text,
  sucursalId: text
});

module.exports ={
  createCuentaSchema,
  updateCuentaSchema,
  getCuentaSchema,
  queryCuentaSchema
  };
