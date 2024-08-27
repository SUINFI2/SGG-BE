const { User, Role, Sucursal, Negocio } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../helpers/jwt");

// Función para registrar un usuario
async function register(user) {
  const { email, password, name, id_rol, active, sucursalId } = user;

  // Buscar la sucursal
  const sucursal = await Sucursal.findOne({
    where: { id: sucursalId },
  });

  if (!sucursal) {
    throw new Error("Sucursal no encontrada");
  }

  // Obtener el ID del negocio
  const negocioId = sucursal.negocioId;

  // Buscar el negocio
  const negocio = await Negocio.findOne({
    where: { id: negocioId },
  });

  if (!negocio) {
    throw new Error("Negocio no encontrado");
  }

  // Generar el nuevo email reemplazando el dominio por el nombre del negocio
  const [nombreUsuario] = email.split('@'); 
  const generatedEmail = `${nombreUsuario}@${negocio.nombre.replace(/\s/g, '')}.com`;

  const existingUser = await User.findOne({
    where: {
      email: generatedEmail,
    },
  });

  if (existingUser) {
    throw new Error("El usuario ya existe");
  }

  const salt = bcrypt.genSaltSync();

  const newUser = await User.create({
    email: generatedEmail,
    password: bcrypt.hashSync(password, salt),
    name,
    id_rol,
    active,
    sucursalId
  });

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
    include: [
      { model: Role, attributes: ["name"] },
      {
        model: Sucursal,
        attributes: ["id", "nombre", "direccion"],
        include: [{ model: Negocio, attributes: ["id", "nombre"] }]
      }
    ]

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
      id_negocio: existingUser.Sucursal.Negocio.id,
      nombre_negocio: existingUser.Sucursal.Negocio.nombre,
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
