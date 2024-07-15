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
                    "date": "Julio 24",
                    "month": 1,
                    "year": 2022,
                    "Ingresos": 50000,
                    "Ventas": 2338,
                    "turno": "Mañana"
                },
                {
                    "id": 2,
                    "date": "Feb 22",
                    "month": 1,
                    "year": 2022,
                    "Ingresos": 100000,
                    "Ventas": 3248,
                    "turno": "Tarde"
                },
                {
                    "id": 3,
                    "date": "Ene 19",
                    "month": 1,
                    "year": 2022,
                    "Ingresos": 50000,
                    "Ventas": 4238,
                    "turno": "Noche"
                }
            ]
        })
    }
);

module.exports = router;
