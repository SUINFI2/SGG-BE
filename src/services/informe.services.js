const { default: axios } = require("axios");
const boom = require('@hapi/boom');

const apiContable = require("../module/apiContable");
const informeVentas = async (query) => {
  const {negocioId, sucursalId, fechaDesde, fechaHasta} = query;

  let options=`/asientos/findAll/?`;
// falta agregar descripcion=venta
  if(negocioId){
    options +=`negocioId=${negocioId}`
  }
  if(sucursalId){
    options +=`&sucursalId=${sucursalId}`
  }
  if(fechaDesde){
    options +=`&fechaDesde=${fechaDesde}`
  }
  if(fechaHasta){
    options +=`&fechaHasta=${fechaHasta}`
  }

    const rta = await apiContable.get(options);
    if(rta.status!=200){
      console.log("llego aqui")
      throw boom.notFound("Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint")
    }

    
   // armar consolidado de los asientos


    return rta.data;

   
};


module.exports = {
  informeVentas
};
