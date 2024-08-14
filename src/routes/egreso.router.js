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
} = require("../services/egreso.services");

//findAll
router.get("/",
    async (req, res) => {
        try {
            const egresos = await findAll();
            res.status(200).json({
                ok: true,
                data: egresos,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error al obtener los egresos",
                error: error.message,
            })

        }
    });

//findOne
router.get("/:egresoId",
    async (req, res) => {
        try {
            const { egresoId } = req.params;
            if (!egresoId) {
                return res.status(400).send("egresoId is required");
            }
            const egreso = await find(egresoId);
            res.status(200).json({
                ok: true,
                data: egreso,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error al obtener el egreso",
                error: error.message,
            });
        }
    });


//create
router.post("/",
    async (req, res) => {
        try {
            const body = req.body;
            const egreso = await create(body);
            res.status(200).json({
                message: "egreso created",
                data: {
                    created: egreso
                }
            });
        } catch (err) {
            next(err);
        }
    });

//update
router.patch("/:egresoId",
    async (req, res) => {
        try {
            const { egresoId } = req.params;
            if (!egresoId) {
                return res.status(400).send("egresoId es requerido");
            }
            const body = req.body;
            if (!body) {
                return res.status(400).send("body es requerido");
            }
            const egreso = await update(egresoId, body);
            res.status(200).json({
                egreso,
            });
        } catch (error) {
            res.status(500).send("Error al actualizar el egreso");
        }
    });

//delete
router.delete("/:egresoId",
    async (req, res) => {
        try {
            const { egresoId } = req.params;
            if (!egresoId) {
                return res.status(400).send("egresoId es requerido");
            }
            const egreso = await remove(egresoId);
            res.status(200).json({
                message: "egreso deleted",
                data: {
                    deleted: egreso
                }
            });
        } catch (error) {
            res.status(500).send("Error al eliminar el egreso");
        }
    });
module.exports = router;