const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");
const {
  createUsuarioSchema,
  updateUsuarioSchema,
  getUsuarioSchema,
  getUsuariosSchema,
} = require("../schemas/usuario.schema");
const {
  create,
  findAll,
  findOne,
  remove,
  update,
} = require("../services/usuario.services");

router.get(
  "/",
  validatorHandler(getUsuariosSchema, "query"),
  async (req, res, next) => {
    try {
      console.log(req.query)
      const usuarios = await findAll(req.query);
      res.json(usuarios);
    } catch (err) {
      next(err);
    }
  }
);
router.get(
  "/:usuarioId",
  validarJWT,
  validatorHandler(getUsuarioSchema, "params"),
  async (req, res, next) => {
    console.log("req.params", req.params);
    try {
      const { usuarioId } = req.params;
      const usuario = await findOne(usuarioId);
      res.json(usuario);
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  "/",
  validarJWT,
  validatorHandler(createUsuarioSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUsuario = await create(body);
      res.json({
        message: "created",
        data: newUsuario,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/:usuarioId",
  validarJWT,
  validatorHandler(getUsuarioSchema, "params"),
  validatorHandler(updateUsuarioSchema, "body"),
  async (req, res, next) => {
    try {
      const { usuarioId } = req.params;
      const body = req.body;
      const usuario = await update(usuarioId, body);
      res.json({
        message: "updated",
        data: usuario,
      });
    } catch (err) {
      next(err);
    }
  }
);
router.delete(
  "/:usuarioId",
  validarJWT,
  validatorHandler(getUsuarioSchema, "params"),
  async (req, res, next) => {
    try {
      const { usuarioId } = req.params;
      const delUsuario = await remove(usuarioId);
      res.json({
        message: "deleted",
        data: delUsuario,
      });
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
