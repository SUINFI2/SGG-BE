const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");
const {
  createWorkday,
  endWorkday,
  getWorkday,
  cierreCaja,
  abrirCaja
} = require("../services/workday.services");

router.post("/start", validarJWT, async (req, res, next) => {
  const { id_user} = req.body;
  try {
    const workday = await createWorkday(id_user);
    res.status(201).json({
      ok: true,
      message: "Workday started",
      data: workday,
    });
  } catch (err) {
    next(err);
  }
});
router.post("/apertura-caja", async (req, res) => {
  const { id_user, SucursalId, montoInicial } = req.body;
  try {
    const workday = await abrirCaja(id_user, SucursalId, montoInicial);
    res.status(201).json({
      message: "Caja abierta con éxito",
      data: workday,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al abrir la caja",
      error: error.message,
    });
  }
});



router.post ("/cierreCaja",  async (req, res, next) => {
  const { userId, montoEnCaja } = req.body;

  try {
    const resultado = await cierreCaja(userId, montoEnCaja);
    res.status(200).json({ message: 'Caja cerrada con éxito', data: resultado });
  } catch (error) {
    console.error("Error al cerrar caja:", error);
    next(error);
  }
}
)


router.post("/end", validarJWT, async (req, res, next) => {
  const { id_user } = req.body;
  try {
    const workday = await endWorkday(id_user);

    if (!workday) {
      return res.status(400).json({
        ok: false,
        message: "Workday not found",
      });
    }

    res.status(201).json({
      ok: true,
      message: "Workday ended",
      data: workday,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/active/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const workday = await getWorkday(userId);
    res.status(200).json(workday);
  } catch (error) {
    res.status(500).json({
      message: "Error getting active workday",
      error,
    });
  }
});

module.exports = router;
