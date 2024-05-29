const express = require('express');
const usuarioRouter = require('./usuario.router');



function routes(app) {
    const router = express.Router();
    app.use('/api/SG', router);
    router.use('/usuario', usuarioRouter);
}