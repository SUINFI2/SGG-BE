
const apiContable = require("../module/apiContable");

const findAll = async (negocioId) => {

    const cliente = await apiContable.get(`/clientes/findAll?negocioId=${negocioId}`);

    if(cliente.status!=200){
      throw boom.notFound(
        "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
      );
     }

     const arrayclientes=[];
     cliente.data.forEach(item => {
      arrayclientes.push({
        nombre: item.perfil.nombre + " "+ item.perfil.apellido,
        email: cliente.data.perfil.email,
        telefono: cliente.data.perfil.telefono,
        direccion: item.perfil.direccion,
        saldo: 0,
        estado: "activo",
      });
     });

    return arrayclientes;
}
const findOne = async (id) => {
    const cliente = await apiContable.get(`/clientes/findOne/${id}`);
    if(cliente.status!=200){
      throw boom.notFound(
        "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
      );     }
    return {
      id: cliente.data.data.id,
      nombre: cliente.data.perfil.nombre + " "+ cliente.data.perfil.apellido,
      email: cliente.data.perfil.email,
      telefono: cliente.data.perfil.telefono,
      direccion: cliente.data.perfil.direccion,
      saldo: 0,
      estado: "activo",
    };
}
const createcliente = async (data) => {

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

  //crear cliente
    const cliente = await apiContable.post(`/clientes/`,{
      perfilId: perfil.data.data.id,
      negocioId: data.negocioId
    });
  if(cliente.status!=200){
    throw boom.notFound(
      // aplicar rollback con un delete perfil a la api de CONTABILIDAD
      "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
    );
    
   }

  return {cliente: cliente.data.data, perfil: perfil.data.data};
}

const EditCliente = async (id, body) => {
    const cliente = await apiContable.patch(`/clientes/${id}`,body);
    if(cliente.status!=200){
      throw boom.notFound(
        "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
      );     }
    return cliente.data;
}
const deleteCliente = async (id) => {
    const cliente = await apiContable.delete(`/clientes/${id}`);
    if(cliente.status!=200){
      throw boom.notFound(
        "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
      );     }
    return cliente.data;
}

module.exports = {
    findOne,
    findAll,
    createCliente,
    EditCliente,
    deleteCliente
}

