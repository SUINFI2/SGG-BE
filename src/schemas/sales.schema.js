const joi = require("joi");

const id = joi.number().integer();
const text = joi.string();
const number = joi.number().positive();

const createSalesSchema = joi.object({
  id_order: text.required(),
  items: joi.array().items(
    joi.object({
      id_cuenta: id.required(),
      amount: text.required(),
    })
  ),
});

module.exports = {
  createSalesSchema,
};
