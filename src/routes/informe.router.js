const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");

const {informeVentasSchema } = require("../schemas/informe.schema");
const {informeVentas} = require("../services/informe.services");


router.get("/informeVenta/",
    validatorHandler(informeVentasSchema,'query'),
    async (req, res) => {
        //falta hacer la logica 

        const informeVenta = await informeVentas(req.query);
        res.json(informeVenta);
        /*
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
        })*/
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
                    "FechadeCreacion": "2024-3-20",
                    "TipodeGasto": "Luz",
                    "Descripcion": "Pago de boleta de luz",
                    "MediodePago": "Efectivo",
                    "Importe": "2000"
                },
                {
                    "FechadeCreacion": "2024-6-10",
                    "TipodeGasto": "Agua",
                    "Descripcion": "Pago de boleta de agua",
                    "MediodePago": "Efectivo",
                    "Importe": "1000"
                },
                {
                    "FechadeCreacion": "2024-5-15",
                    "TipodeGasto": "Mercaderia",
                    "Descripcion": "Pan de lomo",
                    "MediodePago": "Transferencia",
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
                "FechadeCreacion": "2024-3-20",
                "TipodeGasto": "Luz",
                "Descripcion": "Pago de boleta de luz",
                "MediodePago": "Efectivo",
                "Importe": "2000"
            }

        })
    }
);
module.exports = router;
