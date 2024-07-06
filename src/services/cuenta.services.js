const { default: axios } = require("axios");
const apiContable = require("../module/apiContable");
const getCuentas = async () => {

    const rta = await apiContable.get(`/cuentas/findAll`,{params:{negocioId}});
    if(!rta){
      throw { message: "Error"};
     }
    return rta;
}

const getCuenta = async (id) => {
     const rta = await apiContable.get(`/cuentas/findOne/${id}`);
  if(!rta){
    throw { message: "Error"};
   }
  return rta;
}

const createCuenta = async (body) => {
    const rta = await apiContable.post(`/cuentas/findAll`,body);
  if(!rta){
    throw { message: "Error"};
   }
  return rta;
}

const EditCuenta = async (id, body) => {
    const rta = await apiContable.patch(`/cuentas/${id}`,body);
  if(!rta){
    throw { message: "Error"};
   }
  return rta;
}

const deleteCuenta = async (id) => {
    const rta = await apiContable.delete(`/cuentas/${id}`);
    if(!rta){
      throw { message: "Error"};
     }
    return rta;
}

module.exports = {
    getCuentas,
    getCuenta,
    createCuenta,
    EditCuenta,
    deleteCuenta
}