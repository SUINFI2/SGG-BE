const joi = require('joi');

const id = joi.number().integer();
const text = joi.string();

const limit = joi.number().integer();
const offset = joi.number().integer();


const createClienteSchema = joi.object({
  perfilId: id.required(),
  negocioId: text.required()
});

const updateClienteSchema = joi.object({
  perfilId: id,
  cuentaId: id,
  negocioId: text
});
const getClienteSchema = joi.object({
  clienteId: id.required()
});

const queryClienteSchema = joi.object({
  negocioId: text.required()
});

module.exports ={
  createClienteSchema,
  updateClienteSchema,
  getClienteSchema,
  queryClienteSchema
  };
