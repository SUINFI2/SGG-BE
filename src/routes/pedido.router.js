const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const {
  createPedidoSchema,
  updatePedidoSchema,
  getPedidoSchema,
  getPedidosSchema,
} = require("../schemas/pedido.schema");
const {
  findAll,
  findOne,
  create,
  update,
  remove,
} = require("../services/pedido.services");
const { validarJWT } = require("../middleware/validateToken");

router.get(
  "/",
  validarJWT,
  validatorHandler(getPedidosSchema, "query"),
  async (req, res, next) => {
    try {
      const pedidos = await findAll();
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el egreso",
        error: error.message,
      });
    }
  }
);

router.get(
  "/:pedidoId",
  validarJWT,
  validatorHandler(getPedidoSchema, "params"),
  async (req, res, next) => {
    try {
      const { pedidoId } = req.params;
      const pedido = await findOne(pedidoId);
      res.json(pedido);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el egreso",
        error: error.message,
      });
    }
  }
);

router.post(
  "/",
  validarJWT,
  validatorHandler(createPedidoSchema, "body"),
  async (req, res, next) => {
    console.log(req.body);

    try {
      const body = req.body;
      const newPedido = await create(body);
      res.json({
        message: "created",
        data: newPedido,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los pedidos",
        error: error.message,
      });
    }
  }
);

router.patch(
  "/:pedidoId",
  validarJWT,
  validatorHandler(getPedidoSchema, "params"),
  validatorHandler(updatePedidoSchema, "body"),
  async (req, res, next) => {
    try {
      const { pedidoId } = req.params;
      const body = req.body;
      const pedido = await update(pedidoId, body);
      res.json({
        message: "updated",
        data: pedido,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el egreso",
        error: error.message,
      });
    }
  }
);

router.delete(
  "/:pedidoId",
  validarJWT,
  validatorHandler(getPedidoSchema, "params"),
  async (req, res, next) => {
    try {
      const { pedidoId } = req.params;
      const pedido = await remove(pedidoId);
      res.json({
        message: "deleted",
        data: pedido,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el egreso",
        error: error.message,
      });
    }
  }
);

module.exports = router;
