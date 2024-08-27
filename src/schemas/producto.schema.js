const joi = require('joi');

const id = joi.number().integer();
const text = joi.string();
const number = joi.number().positive();
const limit = joi.number().integer();
const offset = joi.number().integer();
const imagen = joi.string().uri();

const createProductoSchema = joi.object({
sucursalId: text.required(),
descripcion: text.required(),
nombre: text.required(),
codigo: text.required(),
categoriaId: id.required(),
imagen: imagen,
cantidad: number,
precio: number,
margen: number
});
 
const   updateProductoSchema = joi.object({
  descripcion: text,
  nombre: text,
  codigo: text,
  categoriaId: id,
  imagen:imagen,
  cantidad: number,
  precio: number,
  margen: number
});
const getProductoSchema = joi.object({
  productoId: id.required(),
  depositoProductoId: id
});

const queryProductoSchema = joi.object({
  negocioId: text.required(),
  sucursalId: text.required(),
  depositoId: text,
  categoriaId: id
});

const updatePorMargenProductoSchema = joi.object({
  sucursalId: text,
  margen: number.required(),
  categoriaId: id.required()
});
const updatePorMargenProductoSeleccionadosSchema = joi.object({
  sucursalId: text,
  margen: number.required(),
  productos: joi.array().items(joi.number().integer()),
});

module.exports = {
  createProductoSchema,
  updateProductoSchema,
  getProductoSchema,
  queryProductoSchema,
  updatePorMargenProductoSchema,
  updatePorMargenProductoSeleccionadosSchema
};
