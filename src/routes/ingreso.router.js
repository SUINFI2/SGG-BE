const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");
const {
    findAll,
    find,
    create,
    update,
    remove,
} = require("../services/ingreso.services");


//findAll
router.get("/",
    async (req, res) => {
        try {
            // const { negocioId } = req.query
            // if (!negocioId) {
            //     return res.status(400).send("ingresoId es requerido");
            // }
            const ingresos = await findAll();
            res.status(200).json({
                ok: true,
                data: ingresos,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error al obtener los egresos",
                error: error.message,
            })

        }
    });

//findOne
router.get("/:ingresoId",
    async (req, res) => {
        try {
            const { ingresoId } = req.params;
            if (!ingresoId) {
                return res.status(400).send("ingresoId is required");
            }
            const ingreso = await find(ingresoId);
            res.status(200).json({
                ok: true,
                data: ingreso,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error al obtener el ingreso",
                error: error.message,
            });
        }
    });

//create

router.post("/",
    async (req, res) => {
        try {
            const body = req.body;
            const ingreso = await create(body);
            res.status(200).json({
                message: "ingreso created",
                data: ingreso,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error creating ingreso",
                error: error.message,
            });
        }
    });

//update
router.patch("/:ingresoId",
    async (req, res) => {
        try {
            const { ingresoId } = req.params;
            const body = req.body;
            const ingreso = await update(ingresoId, body);
            res.status(200).json({
                message: "ingreso updated",
                data: ingreso,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error updating ingreso",
                error: error.message,
            });
        }
    });

//delete
router.delete("/:ingresoId",
    async (req, res) => {
        try {
            const { ingresoId } = req.params;
            const ingreso = await remove(ingresoId);
            res.status(200).json({
                message: "ingreso deleted",
                data: ingreso,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error deleting ingreso",
                error: error.message,
            });
        }
    });

module.exports = router;
