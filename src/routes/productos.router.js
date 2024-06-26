const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");
const { default: axios } = require("axios");

const obtenerProductos = async () => {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL_INVENTARIO}/negocios/findAll`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};

router.get("/", async (req, res) => {
  try {
    const productos = await obtenerProductos();
    res.status(200).json({
      ok: true,
      data: productos,
    });
  } catch (error) {
    res.status(500).send("Error al obtener los productos");
  }
});

module.exports = router;
