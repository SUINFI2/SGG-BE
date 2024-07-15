const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");

const {
  findAll,
  find,
  create,
  update,
  remove,
} = require("../services/orderProduct.services");

//findAll

router.get("/", async (req, res) => {
  try {
    /*     const orderProducts = await findAll();
     */ res.status(200).json({
      ok: true,
      data: [
        {
          id_orderProduct: 1,
          id_prduct: 1,
          id_order: 1,
          cnt: 2,
          precio: 100,
          producto: {
            codigo: "000001",
            producto: "Coca Cola",
            descripcion: "Coca Cola",
            /*  disponibles: 2, */
            sucursal: {
              sucursalId: "38939273-6bff-4563-b1f1-58cdfff70fdc",
              nombre: "sucursal 2",
            },
          },
        },
      ],
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
