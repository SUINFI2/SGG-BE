const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");
const {
  findAll,
  createProducts,
  updateProduct,
  deleteProduct,
} = require("../services/productos.services");

const {createProductoSchema,
  updateProductoSchema,
  getProductoSchema,
  queryProductoSchema} = require('../schemas/producto.schema');

//obtener prodcutos
router.get("/",
  validatorHandler(queryProductoSchema, 'query'),
  async (req, res) => {
  try {
    const productos = await findAll(req.query);
    res.status(200).json({
      ok: true,
      data: productos,
    });
  } catch (error) {
    res.status(500).send("Error al obtener los productos");
  }
});
//guardar productos
router.post("/", 
  validatorHandler(createProductoSchema, "body"),
  async (req, res) => {
  try {
    const body = req.body;
    const productos = await createProducts(body);

    res.status(200).json({
      message: "product created",
      data: {
        creted: "creted"
      }
    });
  } catch (err) {
    next(err);
  }
});
//actualizar productos
router.patch("/:productoId",
  validatorHandler(getProductoSchema,'params'),
  validatorHandler(updateProductoSchema,'body'),
  async (req, res) => {
  try {
    const { productoId } = req.params;
    const body = req.body;
    const producto = await updateProduct(productoId, body);
    res.status(200).json({
      producto,
    });
  } catch (err) {
    next(err);
  }
});
//eliminar productos
router.delete("/:productoId", 
  validatorHandler(getProductoSchema,'params'),
  async (req, res) => {
  try {
    const { productoId } = req.params;
    const producto = await deleteProduct(productoId);
    res.status(200).json({
      producto,
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
