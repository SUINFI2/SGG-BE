const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");
const {
  createMesaSchema,
  updateMesaSchema,
  getMesaSchema,
  getMesasSchema,
} = require("../schemas/mesa.schema");
const {
  create,
  findAll,
  findOne,
  remove,
  update,
} = require("../services/mesa.services");

router.get(
  "/",
  validarJWT,
  validatorHandler(getMesasSchema, "query"),
  async (req, res, next) => {
    try {
      const mesas = await findAll();
      res.json(mesas);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:mesaId",
  validarJWT,
  validatorHandler(getMesaSchema, "params"),
  async (req, res, next) => {
    try {
      const { mesaId } = req.params;
      const mesa = await findOne(mesaId);
      res.json(mesa);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/",
  validatorHandler(createMesaSchema, "body"),
  validarJWT,
  async (req, res, next) => {
    try {
      const body = req.body;
      const newMesa = await create(body);
      res.json({
        message: "created",
        data: newMesa,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/:mesaId",
  validarJWT,
  validatorHandler(getMesaSchema, "params"),
  validatorHandler(updateMesaSchema, "body"),
  async (req, res, next) => {
    try {
      const { mesaId } = req.params;
      const body = req.body;
      const mesa = await update(mesaId, body);
      res.json({
        message: "updated",
        data: mesa,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:mesaId",
  validarJWT,
  validatorHandler(getMesaSchema, "params"),
  async (req, res, next) => {
    try {
      const { mesaId } = req.params;
      const delMesa = await remove(mesaId);
      res.json({
        message: "deleted",
        data: delMesa,
      });
    } catch (err) {
      console.log(err)
      next(err);
    }
  }
);
module.exports = router;
