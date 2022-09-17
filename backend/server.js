require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const users = require("./routes/userRoutes");
const employees = require("./routes/employeeRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const db = require("./config/db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use("/api/users", users);
app.use("/api/employees", employees);

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor conectado en el puerto ${PORT} !!!`);
});
