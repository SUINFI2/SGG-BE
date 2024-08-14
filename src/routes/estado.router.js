const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");
const {
  createEstadoSchema,
  updateEstadoSchema,
  getEstadoSchema,
  getEstadosSchema,
} = require("../schemas/estado.schema");
const {
  create,
  findAll,
  findOne,
  remove,
  update,
} = require("../services/estado.services");

router.get(
  "/",
  validarJWT,
  validatorHandler(getEstadosSchema, "query"),
  async (req, res, next) => {
    try {
      const estados = await findAll();
      res.json(estados);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:estadoId",
  validarJWT,
  validatorHandler(getEstadoSchema, "params"),
  async (req, res, next) => {
    try {
      const { estadoId } = req.params;
      const estado = await findOne(estadoId);
      res.json(estado);
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  "/",
  validarJWT,
  validatorHandler(createEstadoSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newEstado = await create(body);
      res.json({
        message: "created",
        data: newEstado,
      });
    } catch (err) {
      next(err);
    }
  }
);
router.patch(
  "/:estadoId",
  validarJWT,
  validatorHandler(getEstadoSchema, "params"),
  validatorHandler(updateEstadoSchema, "body"),
  async (req, res, next) => {
    try {
      const { estadoId } = req.params;
      const body = req.body;
      const estado = await update(estadoId, body);
      res.json({
        message: "updated",
        data: estado,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:estadoId",
  validarJWT,
  validatorHandler(getEstadoSchema, "params"),
  async (req, res, next) => {
    try {
      const { estadoId } = req.params;
      const delEstado = await remove(estadoId);
      res.json({
        message: "deleted",
        data: delEstado,
      });
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
