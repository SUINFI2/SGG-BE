
const boom = require("@hapi/boom");
const apiContable = require("../module/apiContable");
const models = require("../models");

const create = async (data) => {

  const array = [{
    cuentaSucursalId: data.medioPago,
    monto: data.importe,
    tipo: "haber",
    descripcion: 'gasto',
    categoria: data.categoria
  },{
    cuentaSucursalId: data.proveedor,
    monto: data.importe,
    tipo: "debe",
    descripcion: 'gasto',
    categoria: data.categoria

  }];
  const rta = await apiContable.post(`/asientos/`, array);
  if (rta.status != 200) {
    throw boom.notFound(
      "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
    );
  }

  const gasto = await models.Gasto.create({
    userId: data.userId,
    codigoAsiento: rta.data.data.codigo,
    categoria: data.categoria,
    tipo: data.tipo,
    comprobante: data.comprobante
  });
  if(!gasto){throw boom.notAcceptable('Gasto no creado')}
  return gasto;
 
}

const findAll = async (query) => {

  const { negocioId, sucursalId, fechaDesde, fechaHasta, categoria} = query;

  let options = `/asientos/findAll/?descripcion=gasto`;

  // falta agregar descripcion=venta
  if (negocioId) {
    options += `&negocioId=${negocioId}`
  }
  if (sucursalId) {
    options += `&sucursalId=${sucursalId}`
  }
  if (fechaDesde) {
    options += `&fechaDesde=${fechaDesde}`
  }
  if (fechaHasta) {
    options += `&fechaHasta=${fechaHasta}`
  }
  if (categoria) {
    options += `&categoria=${categoria}`
  }
  const rta = await apiContable.get(options);
  if (rta.status != 200) {
    throw boom.notFound(
      "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
    );
  }
  return rta.data;

}

module.exports = {
  create,
  findAll
};
