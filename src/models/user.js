module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    id_sucursal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  return User;
};
