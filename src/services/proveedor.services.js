const { default: axios } = require("axios");

const apiContable = require("../module/apiContable");

const findAll = async (negocioId) => {
    const rta = await apiContable.get(`/proveedores/findAll`,{params:{negocioId}});
    if(!rta){
      throw { message: "Error"};
     }
    return rta;
}
const findOne = async (id) => {
    const rta = await apiContable.get(`/proveedores/findOne/${id}`);
    if(!rta){
      throw { message: "Error"};
     }
    return rta;
}
const createProveedor = async (body) => {
    const rta = await apiContable.post(`/proveedores/findAll`,body);
  if(!rta){
    throw { message: "Error"};
   }
  return rta;
}

const EditProveedor = async (id, body) => {
    const rta = await apiContable.patch(`/proveedores/${id}`,body);
    if(!rta){
      throw { message: "Error"};
     }
    return rta;
}
const deleteProveedor = async (id) => {
    const rta = await apiContable.delete(`/proveedores/${id}`);
    if(!rta){
      throw { message: "Error"};
     }
    return rta;
}

module.exports = {
    findOne,
    findAll,
    createProveedor,
    EditProveedor,
    deleteProveedor
}

