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

     const arrayProveedores=[];
     proveedor.data.forEach(item => {
      arrayProveedores.push({
        nombre: item.perfil.nombre + " "+ item.perfil.apellido,
        email: "en desarrollo",
        telefono: "en desarrollo",
        direccion: item.perfil.direccion,
        saldo: 0,
        estado: "activo",
      });
     });

    return arrayProveedores;
}
const findOne = async (id) => {
    const proveedor = await apiContable.get(`/proveedores/findOne/${id}`);
    if(proveedor.status!=200){
      throw boom.notFound(
        "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
      );     }
    return {
      nombre: proveedor.data.perfil.nombre + " "+ proveedor.data.perfil.apellido,
      email: "en desarrollo",
      telefono: "en desarrollo",
      direccion: proveedor.data.perfil.direccion,
      saldo: 0,
      estado: "activo",
    };
}
const createProveedor = async (data) => {

// create perfil
  const perfil = await apiContable.post(`/perfiles/`,{
    nombre: data.nombre ,
    apellido: data.apellido,
    cedula: data.cedula,
    tipCedula: data.tipCedula,
    razonSocial: data.razonSocial,
    direccion: data.direccion
  });
if(perfil.status!=200){
  throw boom.notFound(
    "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
  );
  
 }

 console.log("Perfil creado")
 console.log(perfil.data.data)
  //crear proveedor
    const proveedor = await apiContable.post(`/proveedores/`,{
      perfilId: perfil.data.data.id,
      negocioId: data.negocioId
    });
  if(proveedor.status!=200){
    throw boom.notFound(
      // aplicar rollback con un delete perfil a la api de CONTABILIDAD
      "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
    );
    
   }

  return {proveedor: proveedor.data.data, perfil: perfil.data.data};
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

