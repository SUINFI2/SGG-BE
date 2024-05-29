const express = require('express');
const router = express.Router();
const validatorHandler = require('../middleware/validator.handler');
const {
    createEstadoSchema,
    updateEstadoSchema,
    getEstadoSchema,
    getEstadosSchema
} = require('../schemas/estado.schema');



router.get('/findAll',
    validatorHandler(getEstadosSchema, 'query'),
    async (req, res, next) => {
        try {
            const estados = await service.findAll();
            res.json(estados);
        } catch (err) {
            next(err);
        }
    })

router.get('/findOne/:estadoId',
    validatorHandler(getEstadoSchema, 'params'),
    async (req, res, next) => {
        try {
            const { estadoId } = req.params;
            const estado = await service.findOne(estadoId);
            res.json(estado);
        } catch (err) {
            next(err);
        }
    })
router.post('/',
    validatorHandler(createEstadoSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newEstado = await service.create(body);
            res.json({
                message: 'created',
                data: newEstado
            })
        } catch (err) {
            next(err);
        }
    })
router.patch('/:estadoId',
    validatorHandler(getEstadoSchema, 'params'),
    validatorHandler(updateEstadoSchema, 'body'),
    async (req, res, next) => {
        try {
            const { estadoId } = req.params;
            const body = req.body;
            const estado = await service.update(estadoId, body);
            res.json({
                message: 'updated',
                data: estado
            })
        } catch (err) {
            next(err);
        }
    })

router.delete('/:estadoId',
    validatorHandler(getEstadoSchema, 'params'),
    async (req, res, next) => {
        try {
            const { estadoId } = req.params;
            const estado = await service.delete(estadoId);
            res.json({
                message: 'deleted',
                data: estado
            })
        } catch (err) {
            next(err);
        }
    })
module.exports = router;