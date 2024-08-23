const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");

const {
    create,
    findAll
} = require("../services/gasto.services");

const {createGastoSchema,queryGastoSchema} = require('../schemas/gasto.schema');


//create
router.post("/",
    validatorHandler(createGastoSchema, 'body'),
    async (req, res) => {
        try {
            console.log('hola entre en router')
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

    router.get("/",
        validatorHandler(queryGastoSchema, 'query'),
        async (req, res) => {
            try {
                const query = req.query;
                const gastos = await findAll(query);
                res.status(200).json(gastos);
            } catch (error) {
                res.status(500).json({
                    message: "Error al crear el gasto",
                    error: error.message,
                });
            }
        });

module.exports = router;