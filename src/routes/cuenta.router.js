const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const {
    getCuentas,
    getCuenta,
    createCuenta,
    EditCuenta,
    deleteCuenta
} = require("../services/cuenta.services");
const {
    createCuentaSchema,
    updateCuentaSchema,
    getCuentaSchema,
    queryCuentaSchema
} = require("../schemas/cuenta.schema");

//FindAll Cuenta
router.get("/",
    validatorHandler(queryCuentaSchema,'query'),
    async (req, res) => {
    try {
        const cuentas = await getCuentas(req.query);
        res.status(200).json({
            ok: true,
            data: cuentas,
        });
    } catch (error) {
        res.status(500).send("Error al obtener las cuentas");
    }
});

//FindOne Cuenta
router.get("/:cuentaId", 
    validatorHandler(getCuentaSchema,'params'),
    async (req, res) => {
    try {
        const { cuentaId } = req.params;
        const cuenta = await getCuenta(cuentaId);
        res.status(200).json({
            cuenta,
        });
    } catch (error) {
        res.status(500).send("Error al obtener la cuenta");
    }
});

//Create Cuenta
router.post("/",
    validatorHandler(createCuentaSchema,'body'),
    async (req, res) => {
    try {
        const body = req.body;
        const newCuenta = await createCuenta(body);
        res.status(200).json({
            newCuenta,
        });
    } catch (err) {
        res.status(500).send("Error al crear la cuenta");
    }
});

//Update Cuenta
router.patch("/:cuentaId",
    validatorHandler(getCuentaSchema,'params'),
    validatorHandler(updateCuentaSchema,'body'),
    async (req, res) => {
    try {
        const { cuentaId } = req.params;
        const body = req.body;
        const cuenta = await EditCuenta(cuentaId, body);
        res.status(200).json({
            cuenta,
        });
    } catch (error) {
        res.status(500).send("Error al editar la cuenta");
    }
});

//Delete Cuenta
router.delete("/:cuentaId", 
    validatorHandler(getCuentaSchema,'params'),
    async (req, res) => {
    try {
        const { cuentaId } = req.params;
        const cuenta = await deleteCuenta(cuentaId);
        res.status(200).json({
            cuenta,
        });
    } catch (error) {
        res.status(500).send("Error al eliminar la cuenta");
    }
});

module.exports = router;