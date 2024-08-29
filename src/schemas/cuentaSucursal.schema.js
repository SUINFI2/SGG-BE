const joi = require("joi");

const id = joi.number().integer();
const limit = joi.number().integer();
const offset = joi.number().integer();
const text = joi.string();
const number = joi.number().positive();

const createCuentaSucursalSchema = joi.object({
  sucursalId: text.required(),
  cuentaId: id.required()
});


module.exports = {
  createCuentaSucursalSchema
};
