module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define("State", {
    id_estado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return State;
};
