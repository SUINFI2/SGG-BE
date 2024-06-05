module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define("State", {
    id_state: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return State;
};
