const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const { sequelize } = require("./src/models");
const port = process.env.PORT || 3000;

dotenv.config();
app.use(bodyParser.json());
//importar rutas auth
const authRoutes = require("./src/routes/auth");

sequelize
  .sync({ alter: true }) // Sincroniza con la base de datos
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
