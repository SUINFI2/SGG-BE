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
                    "date": "Ene 22",
                    "month": 1,
                    "year": 2022,
                    "Ingresos": 500000,
                    "Egresos": 200000,
                    "Resultado": 300000,
                    "turno": "Mañana"
                },
                {
                    "id": 2,
                    "date": "Ene 22",
                    "month": 1,
                    "year": 2022,
                    "Ingresos": 500000,
                    "Egresos": 200000,
                    "Resultado": 300000,
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