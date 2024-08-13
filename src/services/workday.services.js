const boom = require("@hapi/boom");
const models = require("../models");

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
    // Buscar la jornada laboral activa para el usuario
    const workday = await models.Workday.findOne({
      where: {
        id_user: userId,
        isActive: true,
      },
      order: [["start_time", "DESC"]],
    });

    if (!workday) {
      throw new Error(`No se encontró una jornada de trabajo activa para el usuario ID ${userId}`);
    }

    // Actualizar el monto en caja en la jornada laboral
    workday.monto_en_caja = montoEnCaja;
    workday.isActive = false; // Marcar la jornada como inactiva

    // Guardar los cambios en la base de datos
    await workday.save();

    return workday;
  } catch (error) {
    console.error("Error al cerrar la caja:", error);
    throw error;
  }
};
module.exports = {
  createWorkday,
  endWorkday,
  getWorkday,
  cierreCaja
};
