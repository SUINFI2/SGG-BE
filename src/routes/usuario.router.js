const express = require('express');
const router = express.Router();
const validatorHandler = require('../middleware/validator.handler');
const {
    createUsuarioSchema,
    updateUsuarioSchema,
    getUsuarioSchema,
    getUsuariosSchema
} = require('../schemas/usuario.Schema');
const { create, findAll, findOne, remove, update } = require('../services/usuario.services');




router.get('/findAll',
    validatorHandler(getUsuariosSchema, 'query'),
    async (req, res, next) => {
        try {
            const usuarios = await findAll();
            res.json(usuarios);
        } catch (err) {
            next(err);
        }
    })
router.get('/findOne/:usuarioId',
    validatorHandler(getUsuarioSchema, 'params'),
    async (req, res,) => {
        try {
            const { usuarioId } = req.params;
            const usuario = await findOne(usuarioId);
            res.json(usuario);
        } catch (err) {
            next(err);
        }
    }
)
router.post('/',
    validatorHandler(createUsuarioSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newUsuario = await create(body);
            res.json({
                message: 'created',
                data: newUsuario
            })
        } catch (err) {
            next(err);
        }
    })

router.patch('/:usuarioId',
    validatorHandler(getUsuarioSchema, 'params'),
    validatorHandler(updateUsuarioSchema, 'body'),
    async (req, res, next) => {
        try {
            const { usuarioId } = req.params;
            const body = req.body;
            const usuario = await update(usuarioId, body);
            res.json({
                message: 'updated',
                data: usuario
            });
        } catch (err) {
            next(err);
        }
    })
router.delete('/:usuarioId',
    validatorHandler(getUsuarioSchema, 'params'),
    async (req, res, next) => {
        try {
            const { usuarioId } = req.params;
            const delUsuario = await remove(usuarioId);
            res.json({
                message: 'deleted',
                data: delUsuario
            });
        } catch (err) {
            next(err);
        }
    })
module.exports = router;
