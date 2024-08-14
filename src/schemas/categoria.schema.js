const joi = require('joi');

const id = joi.number().integer();
const text = joi.string();
const number = joi.number().positive();
const limit = joi.number().integer();
const offset = joi.number().integer();
const negocioId = joi.string();
const nombre = joi.string();
const codigo = joi.string()


const createCategoriaSchema = joi.object({
  negocioId: negocioId.required(),
  nombre: nombre.required(),
  codigo: codigo.required()
});

const updateCategoriaSchema = joi.object({
  negocioId: text,
  nombre: text,
  codigo: text
});
const getCategoriaSchema = joi.object({
  categoriaId: id.required()
});
const queryCategoriaSchema = joi.object({
  negocioId: negocioId.required()
});





module.exports = {
  createCategoriaSchema,
  updateCategoriaSchema,
  getCategoriaSchema,
  queryCategoriaSchema
};
