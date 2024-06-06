const { User, Role } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../helpers/jwt");

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
  const salt = bcrypt.genSaltSync();

  const newUser = await User.create({
    email,
    password: bcrypt.hashSync(password, salt),
    name,
    id_rol: 1,
  });

  // Devolver el usuario y el token
  return { user: newUser };
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
  console.log(token);
  // No devolver la contraseña
  existingUser.password = undefined;

  // Devolver el usuario y el token
  return { user: existingUser, token };
}

module.exports = {
  register,
  login,
};
