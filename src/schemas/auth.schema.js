//haceme el schema de un login y registe

// Path: src/schemas/auth.schema.js
const Joi = require("joi");

const email = Joi.string().email();
const password = Joi.string().min(6);
const name = Joi.string().min(3);
const id = Joi.number().positive();

const registerSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  name: name.required(),
});
const loginSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});
module.exports = {
  registerSchema,
  loginSchema,
};
