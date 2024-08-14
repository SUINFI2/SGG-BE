const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");
const {
    createCompra,
    createGasto,
    createVenta,
    findCompras,
    findVentas,
    findGastos
} = require("../services/contabilidad.services");

const {
    createCompraSchema,
    createGastoSchema,
    createVentaSchema,
    getCompraSchema,
    getGastoSchema,
    getVentaSchema
} = require('../schemas/contabilidad.schema')



//Create Compra
router.post("/compra", async (req, res) => {
    validatorHandler(createCompraSchema, 'body');
    try {
        const body = req.body;
        const newCompra = await createCompra(body);
        res.status(200).json({
            newCompra,
        });
    } catch (error) {
        res.status(500).send("Error al crear la compra");
    }
});

//Create Gasto
router.post("/gasto", async (req, res) => {
    validatorHandler(createGastoSchema, 'body');
    try {
        const body = req.body;
        const newGasto = await createGasto(body);
        res.status(200).json({
            newGasto,
        });
    } catch (error) {
        res.status(500).send("Error al crear el gasto");
    }
});

//Create Venta
router.post("/venta", async (req, res) => {
    validatorHandler(createVentaSchema, 'body');
    try {
        const body = req.body;
        const newVenta = await createVenta(body);
        res.status(200).json({
            newVenta,
        });
    } catch (error) {
        res.status(500).send("Error al crear la venta");
    }
});

//FindAll Compras
router.get("/compras", async (req, res) => {
    validatorHandler(getCompraSchema, 'query');
    try {
        const query = req.query;
        const compras = await findCompras(query);
        res.status(200).json({
            compras,
        });
    } catch (error) {
        res.status(500).send("Error al obtener las compras");
    }
});

//FindAll Ventas
router.get("/ventas", async (req, res) => {
    validatorHandler(getVentaSchema, 'query');
    try {
        const query = req.query;
        const ventas = await findVentas(query);
        res.status(200).json({
            ventas,
        });
    } catch (error) {
        res.status(500).send("Error al obtener las ventas");
    }
});

7//FindAll Gastos
router.get("/gastos", async (req, res) => {
    validatorHandler(getGastoSchema, 'query');
    try {
        const query = req.query;
        const gastos = await findGastos(query);
        res.status(200).json({
            gastos,
        });
    } catch (error) {
        res.status(500).send("Error al obtener los gastos");
    }
});