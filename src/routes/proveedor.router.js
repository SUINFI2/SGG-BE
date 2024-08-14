const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");
const {
  findAll,
  findOne,
  createProveedor,
  EditProveedor,
  deleteProveedor,
} = require("../services/proveedor.services");

const {
  createProveedorSchema,
  updateProveedorSchema,
  getProveedorSchema,
  queryProveedorSchema,
} = require("../schemas/proveedor.schema");
//FindAll Proveedor


router.get(
  "/",
  validatorHandler(queryProveedorSchema, "query"),
  async (req, res) => {
    try {
      const { negocioId } = req.query;
      const proveedores = await findAll(negocioId);
      res.status(200).json({
        ok: true,
        data: proveedores
      });

    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los proveedores",
        error: error.message,
      })
    }
  }
);

//FindOne Proveedor
router.get(
  "/:proveedorId",
  validatorHandler(getProveedorSchema, "params"),

  async (req, res) => {
    try {
      const { proveedorId } = req.params;
      const proovedor = await findOne(proveedorId);
      res.status(200).json({
        ok: "found",
        data: proovedor
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el proveedor",
        error: error.message,
      })
    }
  }
);

//Create Proveedor
router.post(
  "/",
  validatorHandler(createProveedorSchema, "body"),
  async (req, res) => {
    try {
      const body = req.body;
      const newProveedor = await createProveedor(body);
      res.status(200).json({
        ok: "created",
        data: newProveedor
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al crear el proveedor",
        error: error.message,
      })
    }
  }
);

//Update Proveedor
router.patch(
  "/:proveedorId",
  validatorHandler(getProveedorSchema, "params"),
  validatorHandler(updateProveedorSchema, "body"),
  async (req, res) => {
    try {
      const { proveedorId } = req.params;
      const body = req.body;
      const proveedor = await EditProveedor(proveedorId, body);
      res.status(200).json({
        proveedor,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar el proveedor",
        error: error.message,
      })
    }
  }
);

//Delete Proveedor
router.delete(
  "/:proveedorId",
  validatorHandler(getProveedorSchema, "params"),
  async (req, res) => {
    try {
      const { proveedorId } = req.params;
      const proveedor = await deleteProveedor(proveedorId);
      res.status(200).json({
        proveedor,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al eliminar el proveedor",
        error: error.message,
      })
    }
  }
);

module.exports = router;
