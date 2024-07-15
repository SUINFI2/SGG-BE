const { default: axios } = require("axios");
const apiInventario = require("../module/apiInventario");
const boom = require("@hapi/boom");

const getCategories = async (negocioId) => {
    console.log(negocioId)

  const rta = await apiInventario.get(`/categorias/findAll?negocioId=${negocioId}`);
    
  if(rta.status!=200){
    throw boom.notFound("Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint")
}
    console.log("Muestra de productos")
    console.log(rta)
  return rta.data;
};
const getCategory = async (id) => {

    const rta = await apiInventario.get(`/categorias/findOne/${id}`);
    if(rta.status != 200){
        throw boom.notFound("Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint")
    }
    return rta.data;
};
const createCategory = async (body) => {

    const rta = await apiInventario.post(`/categorias/`,body);
    if(rta.status != 200){
        throw boom.notFound("Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint")
    }
    return rta.data;
};

const EditCategory = async (id, body) => {

    const rta = await apiInventario.patch(`/categorias/${id}`,body);
    if(rta.status != 200){
        throw boom.notFound("Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint")
    }
    return rta.data;
};
const deleteCategory = async (id) => {

    const rta = await apiInventario.delete(`/categorias/${id}`);
    if(rta.status != 200){
        throw boom.notFound("Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint")
    }
    return rta.data;
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  EditCategory,
  deleteCategory,
};
