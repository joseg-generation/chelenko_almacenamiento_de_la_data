const express = require("express");
const app = express();
const config = require("./utils/config");
const logger = require("./utils/logger");
const hotelesRouter = require("./controllers/hoteles");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
 
 
mongoose.set(`strictQuery`, false);
 
 logger.info("Connecting to ", config.MONGODB_URI);
 
mongoose.connect(config.MONGODB_URI)
  .then(result => {
    logger.info("Conectado a MongoDB");
})
  .catch(error => {
    logger.error("Error conectando a MongoDB:", error.message);
});
 
app.use(express.json())
app.use(middleware.requestLogger)
app.use("/api/hoteles", hotelesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app