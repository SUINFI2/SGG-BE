const joi = require('joi');

const id = joi.number().integer();
const text = joi.string();
const number = joi.number().positive();
const limit = joi.number().integer();
const offset = joi.number().integer();


const createProductoSchema = joi.object({
descripcion: text.required(),
nombre: text.required(),
codigo: text.required(),
categoriaId: id.required()
});

const updateProductoSchema = joi.object({
  descripcion: text,
  nombre: text,
  codigo: text,
  categoriaId: id
});
const getProductoSchema = joi.object({
  productoId: id.required()
});

const queryProductoSchema = joi.object({
  negocioId: text.required(),
  sucursalId: text,
  depositoId: text,
  categoriaId: id
});



module.exports ={
  createProductoSchema,
  updateProductoSchema,
  getProductoSchema,
  queryProductoSchema};
