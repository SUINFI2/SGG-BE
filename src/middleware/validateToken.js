const { response } = require("express");
const jwt = require("jsonwebtoken");
const validarJWT = (req, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "no existe el token",
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
      message: "token no valido",
    });
  }

  next();
};

module.exports = {
  validarJWT,
};
