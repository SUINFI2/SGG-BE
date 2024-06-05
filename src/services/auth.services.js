//haceme el servcio de autenticacion
// Path: src/services/auth.services.js

const { User, Role } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService {
  async register(user) {
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
    const token = this.generateToken(newUser);

    // Devolver el usuario y el token
    return { user: newUser };
  }

  async login(user) {
    const { email, password } = user;

    // Buscar el usuario en la base de datos
    const existingUser = await User.findOne({
      where: {
        email,
      },
      include: [{ model: Role, attributes: ["name"] }], // Incluir el modelo de Role y seleccionar solo el atributo 'nombre'
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
    const token = this.generateToken(existingUser);
    //no quiero devolverle la contraseña
    existingUser.password = undefined;

    // Devolver el usuario y el token
    return { user: existingUser, token };
  }
  // Generar un token JWT
  generateToken(user) {
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
}

module.exports = AuthService;
