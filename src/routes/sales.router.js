const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");
const { createSalesSchema } = require("../schemas/sales.schema");
const { createSales } = require("../services/sales.services");

/* router.get(
  "/",
  //validarJWT,
  validatorHandler(querySucursalSchema, "query"),
  async (req, res, next) => {
    try {
      const Sucursals = await findAll(req.query);
      res.json(Sucursals);
    } catch (err) {
      next(err);
    }
  }
);
router.get(
  "/:sucursalId",
  //validarJWT,
  validatorHandler(getSucursalSchema, "params"),
  async (req, res, next) => {
    try {
      const { sucursalId } = req.params;
      const Sucursal = await findOne(sucursalId);
      res.json(Sucursal);
    } catch (err) {
      next(err);
    }
  }
); */
router.post(
  "/",
  //validarJWT,
  validatorHandler(createSalesSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newSales = await createSales(body);
      res.status(200).json({
        message: "created",
        data: newSales,
      });
    } catch (err) {
      next(err);
    }
  }
);
/* 
router.patch(
  "/:sucursalId",
  //validarJWT,
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
  //validarJWT,
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
); */
module.exports = router;
