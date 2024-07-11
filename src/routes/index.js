const express = require("express");
const usuarioRouter = require("./usuario.router");
const mesaRouter = require("./mesa.router");
const rolRouter = require("./rol.router");
const pedidoRouter = require("./pedido.router");
const estadoRouter = require("./estado.router");
const authRouter = require("./auth.router");
const workdayRouter = require("./workday.router");
const productosRouter = require("./productos.router");
const categoriasRouter = require("./categoria.router");
const proveedorRouter = require("./proveedor.router");
const cuentaRouter = require("./cuenta.router");

const negocioRouter = require("./negocio.router");
const sucursalRouter = require("./sucursal.router");
const egresoRouter = require("./egreso.router");
const ingresoRouter = require("./ingreso.router");
function routes(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/usuario", usuarioRouter);
  router.use("/mesa", mesaRouter);
  router.use("/rol", rolRouter);
  router.use("/pedido", pedidoRouter);
  router.use("/estado", estadoRouter);
  router.use("/auth", authRouter);
  router.use("/workday", workdayRouter);
  router.use("/productos", productosRouter);
  router.use("/categorias", categoriasRouter);
  router.use("/proveedor", proveedorRouter);
  router.use("/cuentas", cuentaRouter);
  router.use("/egreso", egresoRouter);
  router.use("/ingreso", ingresoRouter);


  router.use("/negocios", negocioRouter);
  router.use("/sucursales", sucursalRouter);

}

module.exports = routes;
