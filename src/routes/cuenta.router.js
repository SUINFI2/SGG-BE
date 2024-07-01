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


//FindAll Cuenta
router.get("/", async (req, res) => {
    try {
        const cuentas = await getCuentas();
        res.status(200).json({
            ok: true,
            data: cuentas,
        });
    } catch (error) {
        res.status(500).send("Error al obtener las cuentas");
    }
});

//FindOne Cuenta
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const cuenta = await getCuenta(id);
        res.status(200).json({
            cuenta,
        });
    } catch (error) {
        res.status(500).send("Error al obtener la cuenta");
    }
});

//Create Cuenta
router.post("/", async (req, res) => {
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
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const cuenta = await EditCuenta(id, body);
        res.status(200).json({
            cuenta,
        });
    } catch (error) {
        res.status(500).send("Error al editar la cuenta");
    }
});

//Delete Cuenta
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const cuenta = await deleteCuenta(id);
        res.status(200).json({
            cuenta,
        });
    } catch (error) {
        res.status(500).send("Error al eliminar la cuenta");
    }
});

module.exports = router;