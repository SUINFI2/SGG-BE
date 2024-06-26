const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");
const {
  obtenerProductos,
  obtenerProductosPaginados,
  createProducts,
  updateProduct,
  deleteProduct,
} = require("../services/productos.services");

//obtener prodcutos
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const query = req.query.q || "";
  try {
    const productos = await obtenerProductosPaginados(page, limit, query);
    res.status(200).json({
      ok: true,
      data: productos,
    });
  } catch (error) {
    res.status(500).send("Error al obtener los productos");
  }
});
//guardar productos
router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const newProducto = await createProducts(body);
    res.status(200).json({
      data: newProducto,
    });
  } catch (err) {
    next(err);
  }
});
//actualizar productos
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const producto = await updateProduct(id, body);
    res.status(200).json({
      producto,
    });
  } catch (err) {
    next(err);
  }
});
//eliminar productos
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await deleteProduct(id);
    res.status(200).json({
      producto,
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
