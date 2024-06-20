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
    const workday = await models.workday.create(data);
    return workday;
  } catch (error) {
    console.error("Error creating workday:", error);
    throw error;
  }
};

const endWorkday = async (workdayId) => {
  try {
    const workday = await models.workday.findByPk(workdayId);
    if (workday && workday.isActive) {
      workday.end_time = new Date();
      workday.isActive = false;
      await workday.save();
      return workday;
    }
  } catch (error) {
    console.error("Error finding workday:", error);
    throw error;
  }
};

const getWorkday = async (userId) => {
  try {
    const workday = await models.workday.findOne({
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

module.exports = {
  createWorkday,
  endWorkday,
  getWorkday,
};
