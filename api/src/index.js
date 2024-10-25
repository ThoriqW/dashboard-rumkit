const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const requestTime = require("../middelware/requstTime");
const patientRouters = require("../routes/patients");
const ralanRouters = require("../routes/ralan");
const ranapRouters = require("../routes/ranap");
const authRouters = require("../routes/auth");
const farmasiRouters = require("../routes/farmasi");
const dotenv = require("dotenv");
const errorHandler = require("../middelware/errorHandler");
const logger = require("../middelware/logger");
const bodyParser = require("body-parser");
const authenticateToken = require("../middelware/auth");

dotenv.config();

// Middelware
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestTime);
app.use(errorHandler);
app.use(logger);

// Routes
app.use("/api/auth", authRouters);
app.use("/api/pasien", authenticateToken, patientRouters);
app.use("/api/ralan", authenticateToken, ralanRouters);
app.use("/api/ranap", authenticateToken, ranapRouters);
app.use("/api/getallfarmasi", authenticateToken, farmasiRouters);

// Listening Port
app.listen(process.env.PORT, () => {
  console.info(`Server Running Port: ${process.env.PORT}`);
});
