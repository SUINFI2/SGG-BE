
const boom = require("@hapi/boom");
const apiContable = require("../module/apiContable");

const create = async (data) => {

  const array = data.cuentasOrigen.map((item) => ({
    cuentaSucursalId: Number(item.id_cuenta),
    monto: Number(item.amount),
    tipo: "haber",
  }));

  array.push({
    cuentaSucursalId: data.cuentaDestino.id_cuenta,
    monto: Number(data.cuentaDestino.amount),
    tipo: "debe",
  });


  const arrayAsiento = array.map((item) => {
    return {
      ...item,
      descripcion: "gasto",
    };
  });
  const rta = await apiContable.post(`/asientos/`, arrayAsiento);
  if (rta.status != 200) {
    throw boom.notFound(
      "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
    );
  }
  return rta.data;

}

const findAll = async (query) => {

  const { negocioId, sucursalId, fechaDesde, fechaHasta} = query;

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
