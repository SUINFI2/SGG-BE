const joi = require("joi");

const id = joi.number().integer();
const text = joi.string();
const number = joi.number().positive();
const date = joi.date();


const createGastoSchema = joi.object({
  userId: id.required(),
  medioPago: id.required(), //cuentaSucursalId
  proveedor: id.required(), //cuentaSucursalId
  importe: number.required(),
  categoria: text.required(),
  tipo: text.required(),
  comprobante: text.required(),
});


const queryGastoSchema = joi.object({
  negocioId: text,
  sucursalId: text,
  fechaDesde: date,
  fechaHasta: date,
  temporalidad:  joi.string().valid('day', 'week', 'month')
});
module.exports = {
  createGastoSchema,
  queryGastoSchema
};
