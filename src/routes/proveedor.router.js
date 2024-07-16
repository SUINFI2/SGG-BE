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
      res.status(500).send("Error al obtener los proveedores");
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
        ok:"found",
        data: proovedor
      });
    } catch (error) {
      res.status(500).send("Error al obtener el proveedor");
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
    } catch (err) {
      res.status(500).send("Error al crear el proveedor");
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
    } catch (err) {
      res.status(500).send("Error al actualizar del proveedor");
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
    } catch (err) {
      res.status(500).send("Error al eliminar el proveedor");
    }
  }
);

module.exports = router;
