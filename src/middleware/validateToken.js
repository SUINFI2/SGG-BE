const jwt = require("jsonwebtoken");

//middleware to validate the token
function validateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, "123d!@*&$%#!@#12", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = validateToken;
