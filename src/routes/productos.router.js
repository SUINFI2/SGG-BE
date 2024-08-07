const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");
const {
  findAll,
  createProducts,
  updateProduct,
  deleteProduct,
  findOne,
} = require("../services/productos.services");

const {
  createProductoSchema,
  updateProductoSchema,
  getProductoSchema,
  queryProductoSchema,
} = require("../schemas/producto.schema");

//obtener prodcutos
router.get(
  "/",
  validatorHandler(queryProductoSchema, "query"),
  async (req, res) => {
    try {
      const query = req.query;
      const productos = await findAll(query);
      res.status(200).json({
        ok: true,
        data: productos,
      });
    
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los productos",
        error: error.message,
      });
    }
  }
);

router.get(
  "/:productoId",
  validatorHandler(getProductoSchema, "params"),
  async (req, res) => {
    try {
      const { productoId } = req.params;
      const producto = await findOne(productoId);
      res.status(200).json({
        ok: true,
        data: producto,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los producto",
        error: error.message,
      });
    }
  }
);
//guardar productos
router.post(
  "/",
  validatorHandler(createProductoSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const producto = await createProducts(body);

      res.status(200).json({ message: "created", data: producto });
    } catch (error) {
      res.status(500).json({
        message: "Error al crear el producto",
        error: error.message,
      });
    }
  }
);
//actualizar productos
router.patch(
  "/",
  validatorHandler(getProductoSchema, "query"),
  validatorHandler(updateProductoSchema, "body"),
  async (req, res) => {
    try {
      const query = req.query;
      const body = req.body;
      const producto = await updateProduct(query, body);
      res.status(200).json({
        producto,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar el producto",
        error: error.message,
      });
    }
  }
);
//eliminar productos
router.delete(
  "/:productoId",
  validatorHandler(getProductoSchema, "params"),
  async (req, res) => {
    try {
      const { productoId } = req.params;
      console.log(productoId);
      console.log("product delete")
      const producto = await deleteProduct(productoId);
      res.status(200).json({
        message: "deleted",
        data: producto
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al eliminar el producto",
        error: error.message,
      });
    }
  }
);
module.exports = router;
