const joi = require("joi");

const id = joi.number().integer();
const text = joi.string();
const number = joi.number().positive();
const date = joi.date();


const createGastoSchema = joi.object({
  userId: id.required(),
  sucursalId: text.required(),
  medioPago: id.required(), //cuentaSucursalId
  proveedor: id.required(), //cuentaSucursalId
  importe: number.required(),
  categoria: text,
  tipo: text,
  comprobante: text,
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
