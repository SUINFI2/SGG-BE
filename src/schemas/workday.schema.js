const joi = require("joi");

const id = joi.number().integer();
const start_time = joi.string().min(3).max(50);
const end_time = joi.string().min(3).max(50);
const id_user = joi.number().integer();

const createWorkdaySchema = joi.object({
  start_time: start_time.required(),
  end_time: end_time.required(),
  id_user: id_user.required(),
});

const endWorkdaySchema = joi.object({
  id_workday: id.required(),
});

const getWorkdaySchema = joi.object({
  id_user: id.required(),
});

module.exports = {
  createWorkdaySchema,
  endWorkdaySchema,
  getWorkdaySchema,
};
