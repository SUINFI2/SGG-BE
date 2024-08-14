const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");
const order = require("../models/order");

const {
  findAll,
  update
  // findOne
  //   create,
  //   remove,
} = require("../services/orderProduct.services");

//findAll

router.get("/", async (req, res) => {
  try {
    const orderProducts = await findAll(req.query);
    if (orderProducts.length === 0) {
      res.status(200).json({
        ok: true,
        message: 'No se encontraron orderProducts',
        data: orderProducts,
      });
    } else {
      res.status(200).json({
        ok: true,
        data: orderProducts,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los orderProducts",
      error: error.message,
    });
  }
});

//findOne


// router.get("/:orderProductId", async (req, res) => {
//   try {
//       const { orderProductId } = req.params;
//       if (!orderProductId) {
//           return res.status(400).send("orderProductId is required");
//       }
//       const orderProduct = await findOne(orderProductId);
//       if (!orderProduct) {
//           return res.status(404).json({
//               ok: false,
//               message: `Producto with id ${orderProductId} not found`
//           });
//       }
//       res.status(200).json({
//           ok: true,
//           data: orderProduct,
//       });
//   } catch (error) {
//       res.status(500).json({
//           message: "Error al obtener el orderProduct",
//           error: error.message,
//       });
//   }
// });


router.patch("/:orderProductId", async (req,res)=>{
  try{
    const {orderProductId} = req.params;
    const body = req.body;
    const orderProduct = await update(orderProductId, body)
    res.json ({
      message: "updated",
      data: orderProduct
    });
  }catch (error){
    res.status(500).json({
      message: "Error al actualizar el orderProduct",
      error: error.message,
  })
  }
})

module.exports = router;
