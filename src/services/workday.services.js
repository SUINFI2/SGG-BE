const boom = require("@hapi/boom");
const models = require("../models");
const Sequelize = require('sequelize');
const createWorkday = async (userId) => {
  const data = {
    id_user: userId,
    start_time: new Date(),
    end_time: null,
    isActive: true,
  };

  try {
    const workday = await models.Workday.create(data);
    return workday;
  } catch (error) {
    console.error("Error creating workday:", error);
    throw error;
  }
};

const endWorkday = async (userId) => {
  try {
    const workday = await models.Workday.findOne({
      where: {
        id_user: userId,
        isActive: true,
      },
      order: [["start_time", "DESC"]],
    });

    if (!workday) {
      throw new Error(`No active workday found for user ID ${userId}`);
    }
    workday.end_time = new Date();
    workday.isActive = false;

    await workday.save();

    return workday;
  } catch (error) {
    console.error("Error finding workday:", error);
    throw error;
  }
};

const getWorkday = async (userId) => {
  try {
    const workday = await models.Workday.findOne({
      where: {
        id_user: userId,
        isActive: true,
      },
      include: [
        {
          model: models.User,
          attributes: ["id_user", "name", "email"],
        },
      ],
    });
    return workday;
  } catch (error) {
    console.error("Error getting workday:", error);
    throw error;
  }
};

const cierreCaja = async (userId, montoEnCaja) => {
  try {
    // Buscar la caja abierta más reciente para el usuario
    const caja = await models.Caja.findOne({
      where: {
        id_user: userId,
        estado: 'abierta'
      },
      order: [['fecha_apertura', 'DESC']],
    });

    if (!caja) {
      throw new Error(`No se encontró una caja abierta para el usuario ID ${userId}`);
    }
    caja.monto_caja = montoEnCaja;
    caja.fecha_cierre = new Date();
    caja.estado = 'cerrada';
    await caja.save();

    return caja;
  } catch (error) {
    console.error("Error al cerrar la caja:", error);
    throw error;
  }
};

const abrirCaja = async (id_user, sucursalId, montoInicial) => {
  try {
      const aperturaCaja = await models.Caja.create({
          id_user: id_user,
          SucursalId: sucursalId,
          monto_inicial: montoInicial,
          fecha_apertura: new Date(),
          estado: 'abierta',
      });

      return aperturaCaja;
  } catch (error) {
      console.error('Error al abrir la caja:', error);
      throw boom.internal('No se pudo abrir la caja');
  }
};

module.exports = {
  createWorkday,
  endWorkday,
  getWorkday,
  cierreCaja,
  abrirCaja
};
