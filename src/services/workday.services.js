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

const endWorkday = async (userId) => {
  try {
    const workday = await models.workday.findOne({
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
