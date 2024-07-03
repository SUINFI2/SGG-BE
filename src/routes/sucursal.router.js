const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");
const {
  createSucursalSchema,
  updateSucursalSchema,
  getSucursalSchema,
  getSucursalsSchema,
} = require("../schemas/sucursal.schema");
const {
  create,
  findAll,
  findOne,
  remove,
  update,
} = require("../services/sucursal.services");

router.get(
  "/",
  validarJWT,
  validatorHandler(getSucursalsSchema, "query"),
  async (req, res, next) => {
    try {
      console.log("entro");

      const Sucursals = await findAll();
      res.json(Sucursals);
    } catch (err) {
      next(err);
    }
  }
);
router.get(
  "/:sucursalId",
  validarJWT,
  validatorHandler(getSucursalSchema, "params"),
  async (req, res, next) => {
    console.log("req.params", req.params);
    try {
      const { sucursalId } = req.params;
      const Sucursal = await findOne(sucursalId);
      res.json(Sucursal);
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  "/",
  validarJWT,
  validatorHandler(createSucursalSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newSucursal = await create(body);
      res.json({
        message: "created",
        data: newSucursal,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/:sucursalId",
  validarJWT,
  validatorHandler(getSucursalSchema, "params"),
  validatorHandler(updateSucursalSchema, "body"),
  async (req, res, next) => {
    try {
      const { sucursalId } = req.params;
      const body = req.body;
      const Sucursal = await update(sucursalId, body);
      res.json({
        message: "updated",
        data: Sucursal,
      });
    } catch (err) {
      next(err);
    }
  }
);
router.delete(
  "/:sucursalId",
  validarJWT,
  validatorHandler(getSucursalSchema, "params"),
  async (req, res, next) => {
    try {
      const { sucursalId } = req.params;
      const delSucursal = await remove(sucursalId);
      res.json({
        message: "deleted",
        data: delSucursal,
      });
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
