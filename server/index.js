const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const AppError = require("./src/utils/appError");
require("dotenv").config();
require("./src/config/db");
require("./src/config/cloudinary");

const app = express();
const errorHandler = require("./src/middlewares/errorHandler");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("API running"));

// Routes
app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/notes", require("./src/routes/notes"));
app.use("/api/categories", require("./src/routes/categories"));

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);
app.listen(PORT, () =>
  console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode.`)
);
