const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");
const {
    getProveedor,
    getProveedores,
    createProveedor,
    EditProveedor,
    deleteProveedor
} = require("../services/proveedor.services");


//FindAll Proveedor
router.get("/", async (req, res) => {
    try {
        const proveedores = await getProveedores();
        res.status(200).json({
            ok: true,
            data: proveedores,
        });
    } catch (error) {
        res.status(500).send("Error al obtener los proveedores");
    }
});

//FindOne Proveedor
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const proovedor = await getProveedor(id);
        res.status(200).json({
            categoria,
        });
    } catch (error) {
        res.status(500).send("Error al obtener el proveedor");
    }
});

//Create Proveedor  
router.post("/", async (req, res) => {
    try {
        const body = req.body;
        const newProveedor = await createProveedor(body);
        res.status(200).json({
            newCategoria,
        });
    } catch (err) {
        next(err);
    }
});

//Update Proveedor
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const proveedor = await EditProveedor(id, body);
        res.status(200).json({
            proveedor,
        });
    } catch (err) {
        next(err);
    }
});

//Delete Proveedor
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const proveedor = await deleteProveedor(id);
        res.status(200).json({
            proveedor,
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;