const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");
const {
  getSucursalCuentas,
  createSucursalCuentas,
} = require("../services/sucursalCuentas.services");

const {
  createCuentaSucursalSchema
} = require("../schemas/cuentaSucursal.schema");

router.get(
  "/",
  //validarJWT,
  /* validatorHandler(querySucursalSchema, "query"), */
  async (req, res, next) => {
    const { sucursalId, codigo } = req.query;

    try {
      const cuentasSucursales = await getSucursalCuentas(sucursalId, codigo);
      res.status(200).json({
        data: cuentasSucursales,
      });
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  "/",
  //validarJWT,
  validatorHandler(createCuentaSucursalSchema, "body"),
  async (req, res, next) => {
    const { sucursalId, codigo } = req.query;

    try {
      const cuentasSucursales = await createSucursalCuentas(req.body );
      res.status(200).json({
        data: cuentasSucursales,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
