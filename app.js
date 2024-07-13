const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const routerApi = require("./src/routes/index");
const passport = require("passport");
const session = require("express-session");
const { sequelize } = require("./src/models");
const port = process.env.PORT || 3000;
const morgan = require("morgan");
const cors = require("cors");
const config = require("./config/config");
// Configurar CORS
app.use(cors());
app.options("*", cors({
  origin: ["http://localhost:5173", "https://app.suinfi.com"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}));
dotenv.config();
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
routerApi(app);
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("dev"));
//cors

// Verificar la conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");

    // Sincronizar los modelos con la base de datos
    return sequelize.sync(); //({alter:true}); //  asegura que las tablas se ajusten a cualquier cambio en los modelos
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
