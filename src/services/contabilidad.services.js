const boom = require('@hapi/boom');
const models = require('../models');
const { Association } = require('sequelize');
const apiContable = require("../module/apiContable");

//crear asientos con codigos de prefijo por cada operación y como unico por negocio para un mejor filtro

async function createVenta(arrayAsiento) {

    // estrctura del array 
    /*
    [{ 
        monto: number.required(),
        tipo: 'debe' o 'haber',
        cuentaSucursalId: id.required()
    },{}]
    */
    arrayAsiento = arrayAsiento.map(item => {
        return { 
            ...item, 
            descripcion: 'venta' 
        };
    });

    const rta = await apiContable.post(`/asientos/`,arrayAsiento);
      
    if(rta.status!=200){
      throw boom.notFound("Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint")
  }
  
    return rta.data;
}
async function createCompra(arrayAsiento) {
    arrayAsiento = arrayAsiento.map(item => {
        return { 
            ...item, 
            descripcion: 'compra' 
        };
    });
    const rta = await apiContable.post(`/asientos/`,arrayAsiento);
      
    if(rta.status!=200){
      throw boom.notFound("Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint")
  }
  
    return rta.data;

}
async function createGasto(arrayAsiento) {
    arrayAsiento = arrayAsiento.map(item => {
        return { 
            ...item, 
            descripcion: 'gasto' 
        };
    });
    const rta = await apiContable.post(`/asientos/`,arrayAsiento);
      
    if(rta.status!=200){
      throw boom.notFound("Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint")
  }
  
    return rta.data;

}



module.exports = {
   createCompra,
   createGasto,
   createVenta
}
