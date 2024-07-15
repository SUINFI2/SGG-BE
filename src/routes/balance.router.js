const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");


router.get("/",
    async (req, res) => {
        //falta hacer la logica 
        res.status(200).json({
            ok: true,
            data: [
                {
                    "id": 1,
                    "date": "Dic 24",
                    "month": 12,
                    "year": 2024,
                    "Ingresos": 900000,
                    "Egresos": 500000,
                    "Resultado": 400000,
                    "turno": "Mañana"
                },
                {
                    "id": 2,
                    "date": "May 23",
                    "month": 5,
                    "year": 2023,
                    "Ingresos": 800000,
                    "Egresos": 400000,
                    "Resultado": 400000,
                    "turno": "Tarde"
                },
                {
                    "id": 3,
                    "date": "Ene 22",
                    "month": 1,
                    "year": 2022,
                    "Ingresos": 500000,
                    "Egresos": 200000,
                    "Resultado": 300000,
                    "turno": "Noche"
                }

            ]
        })
    }
);

module.exports = router;