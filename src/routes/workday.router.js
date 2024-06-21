const express = require("express");
const router = express.Router();
const validatorHandler = require("../middleware/validator.handler");
const { validarJWT } = require("../middleware/validateToken");
const {
  createWorkday,
  endWorkday,
  getWorkday,
} = require("../services/workday.services");

router.post("/start", validarJWT, async (req, res, next) => {
  const { userId } = req.body;
  try {
    const workday = await createWorkday(userId);
    res.status(201).json({
      ok: true,
      message: "Workday started",
      data: workday,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/end", validarJWT, async (req, res, next) => {
  const { userId } = req.body;
  try {
    const workday = await endWorkday(userId);

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
