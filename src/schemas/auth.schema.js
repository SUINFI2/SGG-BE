//haceme el schema de un login y registe

// Path: src/schemas/auth.schema.js
const Joi = require("joi");

const email = Joi.string().email();
const password = Joi.string().min(6);
const name = Joi.string().min(3);
const id = Joi.number().positive();
const id_rol = Joi.number().positive();
const active = Joi.boolean();

const registerSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  name: name.required(),
  id_rol: id_rol.required(),
  active: active.required(),
});
const loginSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});
module.exports = {
  registerSchema,
  loginSchema,
};
