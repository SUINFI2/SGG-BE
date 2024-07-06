const { default: axios } = require("axios");
const apiInventario = require("../module/apiInventario");


const findAll = async (negocioId) => {

 
  const rta = await apiInventario.get(`/producto/findAll/${negocioId}`);
  if(!rta){
    throw { message: "Error"};
   }
  return rta;
};


async function createProducts(body) {

  const rta = await apiInventario.post(`/producto/`,body);
  if(!rta){
    throw { message: "Error"};
   }
  return rta;
}

async function updateProduct(id, body) {

  const rta = await apiInventario.patch(`/producto/${id}`,body);
  if(!rta){
    throw { message: "Error"};
   }
  return rta;
}

async function deleteProduct(id) {
  const rta = await apiInventario.delete(`/producto/${id}`);
  if(!rta){
    throw { message: "Error"};
   }
  return rta;
}
module.exports = {
  findAll,
  createProducts,
  updateProduct,
  deleteProduct,
};
