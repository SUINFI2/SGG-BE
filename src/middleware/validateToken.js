const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
  const authHeader = req.header("Authorization");
  console.log(authHeader)
  if (!authHeader) {
    return res.status(401).json({
      ok: false,
      message: "No existe el token",
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "Formato de token no válido",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT);
    req.uid = payload.uid;
    req.name = payload.name;
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      message: "Token no válido",
    });
  }

  next();
};

module.exports = {
  validarJWT,
};