const { User, Role, Sucursal } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../helpers/jwt");

// Función para registrar un usuario
async function register(user) {
  const { email, password, name, id_rol, active, sucursalId } = user;

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
    id_rol,
    active,
    sucursalId
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
    include: [{ model: Role, attributes: ["name"] }],
    include: [{ model: Sucursal, attributes: ["id", "nombre", "direccion"] }]
  });

  if (!existingUser) {
    throw new Error("User not found");
  }
  if (!existingUser.active) {
    throw new Error("User not active");
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
  const response = {
    ok: true,
    msg: "Login Exitoso",
    data: {
      id_user: existingUser.id_user,
      name: existingUser.name,
      email: existingUser.email,
      active: existingUser.active,
      sucursalId: existingUser.Sucursal.id,
      nombre_sucursal: existingUser.Sucursal.nombre,
      direccion_sucursal: existingUser.Sucursal.direccion,
      id_rol: existingUser.id_rol
    },
    token

  };
  console.log(response);
  return response;
}

module.exports = {
  register,
  login,
};
