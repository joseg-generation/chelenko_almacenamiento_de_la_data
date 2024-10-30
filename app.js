const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");

const { guestsRouter, reservationsRouter, rateModificationsRouter, roomsRouter, inventoryRouter, transbankRouter } = require("./controllers/index");

mongoose.set(`strictQuery`, false);

logger.info("Connecting to ", config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(result => {
    logger.info("Conectado a MongoDB");
  })
  .catch(error => {
    logger.error("Error conectando a MongoDB:", error.message);
  });

app.use(cors())
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/guests", guestsRouter);
app.use("/api/reservations", reservationsRouter);
app.use("/api/rate-modifications", rateModificationsRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/transbank", transbankRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
