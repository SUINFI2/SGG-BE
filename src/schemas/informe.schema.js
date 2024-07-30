const joi = require('joi');


const text = joi.string();
const date = joi.date();
const limit = joi.number().integer();
const offset = joi.number().integer();

const informeVentasSchema = joi.object({
    negocioId: text,
    sucursalId: text,
    fechaDesde: date,
    fechaHasta: date
});

module.exports = {
    informeVentasSchema
}