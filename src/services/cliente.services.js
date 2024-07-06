const { default: axios } = require("axios");

const apiContable = require("../module/apiContable");

const findAll = async (negocioId) => {
    const rta = await apiContable.get(`/clientes/findAll`,{params:{negocioId}});
    if(!rta){
      throw { message: "Error"};
     }
    return rta;
}
const findOne = async (id) => {
    const rta = await apiContable.get(`/clientes/findOne/${id}`);
    if(!rta){
      throw { message: "Error"};
     }
    return rta;
}
const createCliente = async (body) => {
    const rta = await apiContable.post(`/clientes/findAll`,body);
  if(!rta){
    throw { message: "Error"};
   }
  return rta;
}

const EditCliente = async (id, body) => {
    const rta = await apiContable.patch(`/clientes/${id}`,body);
    if(!rta){
      throw { message: "Error"};
     }
    return rta;
}
const deleteCliente = async (id) => {
    const rta = await apiContable.delete(`/clientes/${id}`);
    if(!rta){
      throw { message: "Error"};
     }
    return rta;
}

module.exports = {
    findOne,
    findAll,
    createCliente,
    EditCliente,
    deleteCliente
}

