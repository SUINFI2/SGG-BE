const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");
const {
    getCategories,
    getCategory,
    createCategory,
    EditCategory,
    deleteCategory
} = require("../services/categoria.services");


const {
    createCategoriaSchema,
    updateCategoriaSchema,
    getCategoriaSchema,
    queryCategoriaSchema
} = require('../schemas/categoria.schema');

//Obtener categorias
router.get('/', async (req, res) => {
    const { negocioId } = req.query;
    if (!negocioId) {
        return res.status(400).send('negocioId es requerido');
    }

    const categorias = await getCategories(negocioId);
    if (!categorias) {
        return res.status(404).send('No se encontraron categorías');
    }
    res.status(200).json(categorias);
});
//Obtener categoria por id
router.get("/:categoriaId",
    validatorHandler(getCategoriaSchema, 'params'),
    async (req, res) => {
        try {
            const { categoriaId } = req.params;
            const categoria = await getCategory(categoriaId);
            res.status(200).json({
                categoria,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error al obtener la categoria",
                error: error.message
            });
        }
    });
//Crear categoria
router.post("/",
    validatorHandler(createCategoriaSchema, 'body'),
    async (req, res) => {
        try {
            const body = req.body;
            const newCategoria = await createCategory(body);
            res.status(200).json({
                newCategoria,
            });
        } catch (err) {
            res.status(500).json({
                message: "Error al crear la categoria",
                error: err.message
            });
        }
    });
router.patch("/:categoriaId",
    validatorHandler(getCategoriaSchema, 'params'),
    validatorHandler(updateCategoriaSchema, 'body'),

    async (req, res) => {
        try {
            const { categoriaId } = req.params;
            const body = req.body;
            const categoria = await EditCategory(categoriaId, body);
            res.status(200).json({
                categoria,
            });
        } catch (err) {
            next(err);
        }
    });
router.delete("/:categoriaId",
    validatorHandler(getCategoriaSchema, 'params'),
    async (req, res) => {
        try {
            const { categoriaId } = req.params;
            const categoria = await deleteCategory(categoriaId);
            res.status(200).json({
                categoria,
            });
        } catch (err) {
            next(err);
        }
    });

module.exports = router;