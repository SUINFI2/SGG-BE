module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return User;
};
