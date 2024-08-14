const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");
const {
  createNegocioSchema,
  updateNegocioSchema,
  getNegocioSchema,
  queryNegocioSchema,
} = require("../schemas/negocio.schema");
const {
  create,
  findAll,
  findOne,
  remove,
  update,
} = require("../services/negocio.services");

router.get(
  "/",
  //validatorHandler(queryNegocioSchema, "query"),
  async (req, res, next) => {
    try {

      const Negocios = await findAll();
      res.json(Negocios);
    } catch (err) {
      next(err);
    }
  }
);
router.get(
  "/:negocioId",
  //validarJWT,
  validatorHandler(getNegocioSchema, "params"),
  async (req, res, next) => {
    try {
      const { negocioId } = req.params;
      const Negocio = await findOne(negocioId);
      res.json(Negocio);
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  "/",
  //validarJWT,
  validatorHandler(createNegocioSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newNegocio = await create(body);
      res.json({
        message: "created",
        data: newNegocio,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/:negocioId",
//  validarJWT,
  validatorHandler(getNegocioSchema, "params"),
  validatorHandler(updateNegocioSchema, "body"),
  async (req, res, next) => {
    try {
      const { negocioId } = req.params;
      const body = req.body;
      const Negocio = await update(negocioId, body);
      res.json({
        message: "updated",
        data: Negocio,
      });
    } catch (err) {
      next(err);
    }
  }
);
router.delete(
  "/:negocioId",
 // validarJWT,
  validatorHandler(getNegocioSchema, "params"),
  async (req, res, next) => {
    try {
      const { negocioId } = req.params;
      const delNegocio = await remove(negocioId);
      res.json({
        message: "deleted",
        data: delNegocio,
      });
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
