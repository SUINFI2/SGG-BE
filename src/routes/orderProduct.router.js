const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");
const order = require("../models/order");

const {
  findAll,
  //   find,
  //   create,
  //   update,
  //   remove,
} = require("../services/orderProduct.services");

//findAll

router.get("/", async (req, res) => {
  try {
    const orderProducts = await findAll(req.query);
    res.status(200).json({
      ok: true,
      data: orderProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los orderProducts",
      error: error.message,
    });
  }
});

//findOne

router.get("/:orderProductId", async (req, res) => {
  try {
    const { orderProductId } = req.params;
    if (!orderProductId) {
      return res.status(400).send("orderProductId is required");
    }
    const orderProduct = await find(orderProductId);
    res.status(200).json({
      ok: true,
      data: orderProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el orderProduct",
      error: error.message,
    });
  }
});

module.exports = router;
