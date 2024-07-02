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

//Obtener categorias
router.get("/", async (req, res) => {
    try {
        // analizar el req 
        const categorias = await getCategories();
        res.status(200).json({
            ok: true,
            data: categorias,
        });
    } catch (error) {
        res.status(500).send("Error al obtener las categorias");
    }
});
//Obtener categoria por id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await getCategory(id);
        res.status(200).json({
            categoria,
        });
    } catch (error) {
        res.status(500).send("Error al obtener la categoria");
    }
});
//Crear categoria
router.post("/", async (req, res) => {
    try {
        const body = req.body;
        const newCategoria = await createCategory(body);
        res.status(200).json({
            newCategoria,
        });
    } catch (err) {
        next(err);
    }
});
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const categoria = await EditCategory(id, body);
        res.status(200).json({
            categoria,
        });
    } catch (err) {
        next(err);
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await deleteCategory(id);
        res.status(200).json({
            categoria,
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;