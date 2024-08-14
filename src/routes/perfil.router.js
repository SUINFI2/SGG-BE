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
} = require("../services/perfil.services");

//findAll
router.get("/",
    async (req, res) => {
        try {
            const perfiles = await findAll();
            res.status(200).json({
                ok: true,
                data: perfiles,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error al obtener los perfiles",
                error: error.message,
            })

        }
    });

//findOne
router.get("/:perfilId",
    async (req, res) => {
        try {
            const { perfilId } = req.params;
            if (!perfilId) {
                return res.status(400).send("perfilId is required");
            }
            const perfil = await find(perfilId);
            res.status(200).json({
                ok: true,
                data: perfil,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error al obtener el perfil",
                error: error.message,
            });
        }
    });


//create
router.post("/",
    async (req, res) => {
        try {
            const body = req.body;
            const perfil = await create(body);
            res.status(200).json({
                message: "perfil created",
                data: perfil,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error al crear el perfil",
                error: error.message,
            });
        }
    });

//update
router.patch("/:perfilId",
    async (req, res) => {
        try {
            const { perfilId } = req.params;
            const body = req.body;
            const perfil = await update(perfilId, body);
            res.status(200).json({
                message: "perfil updated",
                data: perfil,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error al actualizar el perfil",
                error: error.message,
            });
        }
    });

//delete
router.delete("/:perfilId",
    async (req, res) => {
        try {
            const { perfilId } = req.params;
            const perfil = await remove(perfilId);
            res.status(200).json({
                message: "perfil deleted",
                data: perfil,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error al eliminar el perfil",
                error: error.message,
            });
        }
    });

module.exports = router;