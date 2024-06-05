const express = require("express");
const usuarioRouter = require("./usuario.router");
const mesaRouter = require("./mesa.router");
const rolRouter = require("./rol.router");
const pedidoRouter = require("./pedido.router");
const estadoRouter = require("./estado.router");
const authRouter = require("./auth.router");

function routes(app) {
  const router = express.Router();
  app.use("/v1/api", router);
  router.use("/usuario", usuarioRouter);
  router.use("/mesa", mesaRouter);
  router.use("/rol", rolRouter);
  router.use("/pedido", pedidoRouter);
  router.use("/estado", estadoRouter);
  router.use("/auth", authRouter);
}

module.exports = routes;
