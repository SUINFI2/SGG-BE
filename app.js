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
const {config} = require("./config/config");
// Configurar CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "https://app.suinfi.com"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
dotenv.config();
app.use(bodyParser.json());

app.use(
  session({
    secret: config.SessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);
routerApi(app);
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("dev"));
//cors
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

