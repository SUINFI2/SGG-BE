const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");

const {
    create,
} = require("../services/gasto.services");

const {createGastoSchema} = require('../schemas/gasto.schema');


//create
router.post("/",
    validatorHandler(createGastoSchema, 'body'),
    async (req, res) => {
        try {
            const body = req.body;
            const gasto = await create(body);
            res.status(200).json({
                message: "gasto created",
                data: gasto,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error al crear el gasto",
                error: error.message,
            });
        }
    });



module.exports = router;