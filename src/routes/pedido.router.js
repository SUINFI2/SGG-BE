const express = require('express');
const router = express.Router();
const validatorHandler = require('../middleware/validator.handler');
const {
    createPedidoSchema,
    updatePedidoSchema,
    getPedidoSchema,
    getPedidosSchema
} = require('../schemas/pedido.schema');
const { findAll, findOne, create, update, remove } = require('../services/pedido.services');

router.get('/findAll',
    validatorHandler(getPedidosSchema, 'query'),
    async (req, res, next) => {
        try {
            const pedidos = await findAll();
            res.json(pedidos);
        } catch (err) {
            next(err);
        }
    })

router.get('/findOne/:pedidoId',
    validatorHandler(getPedidoSchema, 'params'),
    async (req, res, next) => {
        try {
            const { pedidoId } = req.params;
            const pedido = await findOne(pedidoId);
            res.json(pedido);
        } catch (err) {
            next(err);
        }
    })

router.post('/',
    validatorHandler(createPedidoSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newPedido = await create(body);
            res.json({
                message: 'created',
                data: newPedido
            })
        } catch (err) {
            next(err);
        }
    })

router.patch('/:pedidoId',
    validatorHandler(getPedidoSchema, 'params'),
    validatorHandler(updatePedidoSchema, 'body'),
    async (req, res, next) => {
        try {
            const { pedidoId } = req.params;
            const body = req.body;
            const pedido = await update(pedidoId, body);
            res.json({
                message: 'updated',
                data: pedido
            })
        } catch (err) {
            next(err);
        }
    })

router.delete('/:pedidoId',
    validatorHandler(getPedidoSchema, 'params'),
    async (req, res, next) => {
        try {
            const { pedidoId } = req.params;
            const pedido = await remove(pedidoId);
            res.json({
                message: 'deleted',
                data: pedido
            })
        } catch (err) {
            next(err);
        }
    })

module.exports = router;