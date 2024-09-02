const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");

const {
    getCategoriaGastos,
    getCategoriaGasto,
    createCategoriaGasto,
    EditCategoriaGasto,
    deleteCategoriaGasto,
} = require("../services/categoriaGasto.services");

const {createCategoriaGastoSchema,
    queryCategoriaGastoSchema} = require('../schemas/categoriaGasto.schema');


//create
router.post("/",
    validatorHandler(createCategoriaGastoSchema, 'body'),
    async (req, res) => {
        try {
            const body = req.body;
            const gasto = await createCategoriaGasto(body);
            res.status(200).json({
                message: "created",
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
        validatorHandler(queryCategoriaGastoSchema, 'query'),
        async (req, res) => {
            try {
                console.log('llegue por aqui')
                const query = req.query;
                const gastos = await getCategoriaGastos(query);
                res.status(200).json(gastos);
            } catch (error) {
                res.status(500).json({
                    message: "Error al crear el gasto",
                    error: error.message,
                });
            }
        });

module.exports = router;