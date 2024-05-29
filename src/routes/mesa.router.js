const express = require('express');
const router = express.Router();
const validatorHandler = require('../middleware/validator.handler');
const {
    createMesaSchema,
    updateMesaSchema,
    getMesaSchema,
    getMesasSchema
} = require('../schemas/mesa.schema');

router.get('/findAll',
    validatorHandler(getMesasSchema, 'query'),
    async (req, res, next) => {
        try {
            const mesas = await service.findAll();
            res.json(mesas);
        } catch (err) {
            next(err);
        }
    })

router.get('/findOne/:mesaId',
    validatorHandler(getMesaSchema, 'params'),
    async (req, res, next) => {
        try {
            const { mesaId } = req.params;
            const mesa = await service.findOne(mesaId);
            res.json(mesa);
        } catch (err) {
            next(err);
        }
    })

router.post('/',
    validatorHandler(createMesaSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newMesa = await service.create(body);
            res.json({
                message: 'created',
                data: newMesa
            })
        } catch (err) {
            next(err);
        }
    })

router.patch('/:mesaId',
    validatorHandler(getMesaSchema, 'params'),
    validatorHandler(updateMesaSchema, 'body'),
    async (req, res, next) => {
        try {
            const { mesaId } = req.params;
            const body = req.body;
            const mesa = await service.update(mesaId, body);
            res.json({
                message: 'updated',
                data: mesa
            })
        } catch (err) {
            next(err);
        }
    })

router.delete('/:mesaId',
    validatorHandler(getMesaSchema, 'params'),
    async (req, res, next) => {
        try {
            const { mesaId } = req.params;
            const delMesa = await service.delete(mesaId);
            res.json({
                message: 'deleted',
                data: delMesa
            })
        } catch (err) {
            next(err);
        }
    })
module.exports = router;