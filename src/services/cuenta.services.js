const { default: axios } = require("axios");
const apiContable = require("../module/apiContable");

const getCuentas = async (query) => {
  const { negocioId, sucursalId, filtro } = query;
  const rta = await apiContable.get(`/cuentas/findAll?negocioId=${negocioId}`);

  if (rta.status != 200) {
    throw boom.notFound(
      "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
    );
  }
  /* if (filtro) {
    return rta.data.filter((cuenta) => cuenta.tipo === filtro);
  }
 */
  return rta.data;
};

const getCuenta = async (id) => {
  const rta = await apiContable.get(`/cuentas/findOne/${id}`);

  if (rta.status != 200) {
    throw boom.notFound("cuenta not found");
  }

  return rta.data;
};

const createCuenta = async (body) => {
  const rta = await apiContable.get(`/cuentas/`, body);

  if (rta.status != 200) {
    throw boom.notFound(
      "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
    );
  }

  return rta.data;
};

const EditCuenta = async (id, body) => {
  const rta = await apiContable.patch(`/cuentas/${id}`, body);

  if (rta.status != 200) {
    throw boom.notFound(
      "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
    );
  }

  return rta.data;
};

const deleteCuenta = async (id) => {
  const rta = await apiContable.delete(`/cuentas/${id}`);

  if (rta.status != 200) {
    throw boom.notFound(
      "Ups.... Algo no salio bien!  Notifica al backend encargado la url endpoint"
    );
  }

  return rta.data;
};

module.exports = {
  getCuentas,
  getCuenta,
  createCuenta,
  EditCuenta,
  deleteCuenta,
};
