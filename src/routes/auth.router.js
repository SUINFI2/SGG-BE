//haceme el router

// Path: src/routes/auth.router.js
const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const validatorHandler = require("../middleware/validator.handler");
const { registerSchema, loginSchema } = require("../schemas/auth.schema");
const AuthService = require("../services/auth.services");
const service = new AuthService();

router.post(
  "/register",
  validatorHandler(registerSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.register(body);
      res.json({
        message: "user registered",
      });
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }
);

//login

router.post("/login", async (req, res, next) => {
  try {
    // Extraer correo electrónico y contraseña del cuerpo de la solicitud
    const { email, password } = req.body;

    // Llamar a la función de inicio de sesión del servicio de autenticación
    const { user, token } = await service.login({ email, password });

    res.json({ user, token });
  } catch (error) {
    // Manejar errores de inicio de sesión

    res.status(401).json({ error: error.message });
  }
});

module.exports = router;
