const { default: axios } = require("axios");
const apiInventario = require("../module/apiInventario");

const getCategories = async (negocioId) => {

  const rta = await apiInventario.get(`/categoria/findAll`,{params:{negocioId}});
  if(!rta){
    throw { message: "Error"};
   }
  return rta;
};
const getCategory = async (id) => {

    const rta = await apiInventario.get(`/categoria/findOne${id}`);
    if(!rta){
        throw { message: "Error"};
       }
    return rta;
};
const createCategory = async (body) => {

    const rta = await apiInventario.post(`/categoria/`,body);
    if(!rta){
        throw { message: "Error"};
       }
    return rta;
};

const EditCategory = async (id, body) => {

    const rta = await apiInventario.patch(`/categoria/${id}`,body);
    if(!rta){
        throw { message: "Error"};
       }
    return rta;
};
const deleteCategory = async (id) => {

    const rta = await apiInventario.post(`/categoria/${id}`);
    if(!rta){
        throw { message: "Error"};
       }
    return rta;
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  EditCategory,
  deleteCategory,
};
