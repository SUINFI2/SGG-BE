const models = require("../models");
const boom = require("@hapi/boom");


const getCategoriaGastos = async (query) => {
  const { negocioId } = query;
  const rta = await models.categoriaGasto.findAll({where:{negocioId}})
  if(!rta){throw boom.notFound('categoria gastos not found')}
  return rta;
};

const getCategoriaGasto = async (id) => {

  const rta = await models.categoriaGasto.findByPk(id)
  if(!rta){throw boom.notFound('categoria gasto not found')}
  return rta;
};

const createCategoriaGasto = async (body) => {
  const rta = await models.categoriaGasto.create(body)
  if(!rta){throw boom.notFound('categoria gastos not created')}
  return rta;
};

const EditCategoriaGasto = async (id, body) => {
  
  const categoriaGasto = await getCategoriaGasto(id);
  const rta = await categoriaGasto.update(body);
  if(!rta){ throw boom.notFound('Categoria Gasto not updated')}
  return rta;
};

const deleteCategoriaGasto = async (id) => {
  const categoriaGasto = await getCategoriaGasto(id);
  const rta = await categoriaGasto.destroy();
  if(!rta){ throw boom.notFound('Categoria Gasto not deleted')}
  return rta;
};

module.exports = {
  getCategoriaGastos,
  getCategoriaGasto,
  createCategoriaGasto,
  EditCategoriaGasto,
  deleteCategoriaGasto,
};
