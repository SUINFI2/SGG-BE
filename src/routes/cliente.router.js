const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");
const {
    findAll,
    findOne,
    createCliente,
    EditCliente,
    deleteCliente
} = require("../services/cliente.services");

const {
    createClienteSchema,
    updateClienteSchema,
    getClienteSchema,
    queryClienteSchema
    }=require('../schemas/cliente.schema')
//FindAll Cliente
router.get("/", 
    validatorHandler(queryClienteSchema,'query'),
    async (req, res) => {
    try {
        const {negocioId}=req.query;
        const Clientees = await findAll(negocioId);
        res.status(200).json({
            ok: true,
            data: Clientees,
        });
    } catch (error) {
        res.status(500).send("Error al obtener los Clientees");
    }
});

//FindOne Cliente
router.get("/:clienteId", 
    validatorHandler(getClienteSchema,'params'),

    async (req, res) => {
    try {
        const { clienteId } = req.params;
        const proovedor = await findOne(clienteId);
        res.status(200).json({
            categoria,
        });
    } catch (error) {
        res.status(500).send("Error al obtener el Cliente");
    }
});

//Create Cliente  
router.post("/", 
    validatorHandler(createClienteSchema,'body'),
    async (req, res) => {
    try {
        const body = req.body;
        const newCliente = await createCliente(body);
        res.status(200).json({
            newCategoria,
        });
    } catch (err) {
        next(err);
    }
});

//Update Cliente
router.patch("/:clienteId", 
    validatorHandler(getClienteSchema,'params'),
    validatorHandler(updateClienteSchema,'body'),
    async (req, res) => {
    try {
        const { clienteId } = req.params;
        const body = req.body;
        const Cliente = await EditCliente(clienteId, body);
        res.status(200).json({
            Cliente,
        });
    } catch (err) {
        next(err);
    }
});

//Delete Cliente
router.delete("/:clienteId",
    validatorHandler(getClienteSchema,'params'),
    async (req, res) => {
    try {
        const { clienteId } = req.params;
        const Cliente = await deleteCliente(clienteId);
        res.status(200).json({
            Cliente,
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;