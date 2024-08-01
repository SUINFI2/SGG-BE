const jwt = require("jsonwebtoken");

//hacelo sin promesa
const generateToken = (user) => {
  const { id, name, email, id_rol } = user;
  const payload = { id, name, email, id_rol };

  return jwt.sign(payload, process.env.SECRET_JWT, {
    expiresIn: "1d",
  });
};

module.exports = {
  generateToken,
};
