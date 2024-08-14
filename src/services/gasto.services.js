
const boom = require("@hapi/boom");
const { createGasto } = require("./contabilidad.services");


const create = async (data) => {

  const array = data.cuentasOrigen.map((item) => ({
    cuentaSucursalId: Number(item.id_cuenta),
    monto: Number(item.amount),
    tipo: "haber",
  }));

  array.push({
    cuentaSucursalId: data.cuentaDestino.id_cuenta,
    monto:Number( data.cuentaDestino.amount),
    tipo: "debe",
  });


  // Crear asiento contable
 const rta = await createGasto(array);
  return rta;
}

module.exports = {
  create,
};
