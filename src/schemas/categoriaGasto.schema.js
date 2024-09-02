const joi = require("joi");

const text = joi.string();


const createCategoriaGastoSchema = joi.object({
  negocioId: text.required(),
  nombre: text.required()
});


const queryCategoriaGastoSchema = joi.object({
  negocioId: text.required()
});
module.exports = {
  createCategoriaGastoSchema,
  queryCategoriaGastoSchema
};
