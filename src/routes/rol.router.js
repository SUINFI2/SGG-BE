const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");
const {
  createRolSchema,
  updateRolSchema,
  getRolSchema,
  getRolesSchema,
} = require("../schemas/rol.schema");
const {
  findAll,
  findOne,
  create,
  update,
  remove,
} = require("../services/rol.services");

router.get(
  "/",
  validarJWT,
  validatorHandler(getRolesSchema, "query"),
  async (req, res, next) => {
    try {
      const Roles = await findAll();
      res.json(Roles);
    } catch (err) {
      next(err);
    }
  }
);
router.get(
  "/:rolId",
  validarJWT,
  validatorHandler(getRolSchema, "params"),
  async (req, res, next) => {
    try {
      const { rolId } = req.params;
      const Rol = await findOne(rolId);
      res.json(Rol);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/",
  validarJWT,
  validatorHandler(createRolSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newRol = await create(body);
      res.json({
        message: "created",
        data: newRol,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/:rolId",
  validarJWT,
  validatorHandler(getRolSchema, "params"),
  validatorHandler(updateRolSchema, "body"),
  async (req, res, next) => {
    try {
      const { rolId } = req.params;
      const body = req.body;
      const updatedRole = await update(rolId, body);
      res.json({
        message: "updated",
        data: updatedRole,
      });
    } catch (err) {
      next(err);
    }
  }
);
router.delete(
  "/:rolId",
  validarJWT,
  validatorHandler(getRolSchema, "params"),
  async (req, res, next) => {
    try {
      const { rolId } = req.params;
      const delRol = await remove(rolId);
      res.json({
        message: "deleted",
        data: delRol,
      });
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
