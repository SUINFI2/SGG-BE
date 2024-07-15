const { default: axios } = require("axios");

const apiContable = require("../module/apiContable");

const findAll = async (negocioId) => {

    console.log("volvi a entrar")
    const proveedor = await apiContable.get(`/proveedores/findAll?negocioId=${negocioId}`);

    if(proveedor.status!=200){
      throw boom.notFound(
        "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
      );
     }

    return proveedor.data;
}
const findOne = async (id) => {
    const proveedor = await apiContable.get(`/proveedores/findOne/${id}`);
    if(proveedor.status!=200){
      throw boom.notFound(
        "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
      );     }
    return proveedor.data;
}
const createProveedor = async (body) => {
    const proveedor = await apiContable.post(`/proveedores/`,body);
  if(proveedor.status!=200){
    throw boom.notFound(
      "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
    );
    
   }
  return proveedor.data;
}

const EditProveedor = async (id, body) => {
    const proveedor = await apiContable.patch(`/proveedores/${id}`,body);
    if(proveedor.status!=200){
      throw boom.notFound(
        "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
      );     }
    return proveedor.data;
}
const deleteProveedor = async (id) => {
    const proveedor = await apiContable.delete(`/proveedores/${id}`);
    if(proveedor.status!=200){
      throw boom.notFound(
        "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
      );     }
    return proveedor.data;
}

module.exports = {
    findOne,
    findAll,
    createProveedor,
    EditProveedor,
    deleteProveedor
}

