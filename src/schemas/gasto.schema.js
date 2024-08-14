const joi = require("joi");

const id = joi.number().integer();
const text = joi.string();
const number = joi.number().positive();


const cuentaDestino = joi.object({

});
const createGastoSchema = joi.object({
  sucursalId: text.required(),
  cuentasOrigen: joi.array().items(
    joi.object({
      id_cuenta: id.required(),
      amount: number.required(),
    })
  ),
  cuentaDestino: joi.object({
      id_cuenta: id.required(),
      amount: number.required(),
    })
});
const queryGastoSchema = joi.object({
 
});
module.exports = {
  createGastoSchema,
  queryGastoSchema
};
