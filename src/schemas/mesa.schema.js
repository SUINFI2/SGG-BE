const joi = require('joi');

const id = joi.number().integer();
const number = joi.number().integer();
const id_state = joi.number().integer();
const id_user = joi.number().integer();
const limit = joi.number().integer();
const offset = joi.number().integer();
const estado = joi.boolean();

const createMesaSchema = joi.object({
    number: number.required(),
    id_state: id_state.required(),
    id_user: id_user.required()
})

const updateMesaSchema = joi.object({
    number: number,
    id_state: id_state,
    id_user: id_user
})

const getMesaSchema = joi.object({
    mesaId: id.required()
})
const getMesasSchema = joi.object({

})

module.exports = {
    createMesaSchema,
    updateMesaSchema,
    getMesaSchema,
    getMesasSchema
}