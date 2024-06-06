const { User, Role } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Función para registrar un usuario
async function register(user) {
  const { email, password, name } = user;

  // Verificar si el usuario ya existe
  const existingUser = await User.findOne({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Crear un nuevo usuario en la base de datos
  const newUser = await User.create({
    email,
    password: bcrypt.hashSync(password, 10),
    name,
    id_rol: 1,
  });

  // Generar el token JWT
  const token = generateToken(newUser);

  // Devolver el usuario y el token
  return { user: newUser, token };
}

// Función para iniciar sesión
async function login(user) {
  const { email, password } = user;

  // Buscar el usuario en la base de datos
  const existingUser = await User.findOne({
    where: {
      email,
    },
    include: [{ model: Role, attributes: ["name"] }], // Incluir el modelo de Role y seleccionar solo el atributo 'name'
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  // Verificar la contraseña
  const validPassword = bcrypt.compareSync(password, existingUser.password);

  if (!validPassword) {
    throw new Error("Invalid password");
  }

  // Generar el token JWT
  const token = generateToken(existingUser);
  // No devolver la contraseña
  existingUser.password = undefined;

  // Devolver el usuario y el token
  return { user: existingUser, token };
}

// Función para generar un token JWT
function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
  };

  const options = {
    expiresIn: "1h", // Tiempo de expiración del token
  };

  // Firmar el token con la clave secreta
  const token = jwt.sign(payload, "123d!@*&$%#!@#12", options);
  return token;
}

module.exports = {
  register,
  login,
};