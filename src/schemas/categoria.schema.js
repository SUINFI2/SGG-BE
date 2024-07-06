const joi = require('joi');

const id = joi.number().integer();
const text = joi.string();
const number = joi.number().positive();
const limit = joi.number().integer();
const offset = joi.number().integer();


const createCategoriaSchema = joi.object({
negocioId: text.required(),
nombre: text.required(),
codigo: text.required()
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
  negocioId: text.required()
});





module.exports ={
  createCategoriaSchema,
  updateCategoriaSchema,
  getCategoriaSchema,
  queryCategoriaSchema
  };
