const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");

router.get("/informeVenta/",
    async (req, res) => {
        //falta hacer la logica 
        res.status(200).json({
            ok: true,
            data: [
                {
                    "id": 1,
                    "date": "Julio 24",
                    "month": 7,
                    "year": 2022,
                    "Ingresos": 50000,
                    "Ventas": 2338,
                    "turno": "Mañana"
                },
                {
                    "id": 2,
                    "date": "Feb 22",
                    "month": 2,
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

router.get("/balance/",
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

router.get("/gastos/",
    async (req, res) => {
        res.status(200).json({
            ok: true,
            data: [
                {
                    "Fecha de Creacion": "2024-3-20",
                    "Tipo de gasto": "Luz",
                    "Descripcion": "Pago de boleta de luz",
                    "Medio de Pago": "Efectivo",
                    "Importe": "2000"
                },
                {
                    "Fecha de Creacion": "2024-6-10",
                    "Tipo de gasto": "Agua",
                    "Descripcion": "Pago de boleta de agua",
                    "Medio de Pago": "Efectivo",
                    "Importe": "1000"
                },
                {
                    "Fecha de Creacion": "2024-5-15",
                    "Tipo de gasto": "Mercaderia",
                    "Descripcion": "Pan de lomo",
                    "Medio de Pago": "Transferencia",
                    "Importe": "50000"
                }
            ]
        }
        )
    }
);

router.post("/gastos/",
    async (req, res) => {
        //falta hacer service y schema
        res.status(200).json({
            ok: true,
            message: "Gasto creado",
            data: {
                "Fecha de Creacion": "2024-3-20",
                "Tipo de gasto": "Luz",
                "Descripcion": "Pago de boleta de luz",
                "Medio de Pago": "Efectivo",
                "Importe": "2000"
            }

        })
    }
);
module.exports = router;
