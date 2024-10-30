const transbankRouter = require("express").Router();
const { Transbank, Guest } = require("../models/index");

transbankRouter.get("/", (req, res, next) => {
    Transbank.find({})
      .populate("guest")
      .then((transactions) => res.json(transactions))
      .catch((error) => next(error)); 
  });
  
 transbankRouter.get("/:id", (req, res, next) => {
    const { id } = req.params;
    Transbank.findById(id)
      .populate("guest")
      .then((transaction) => {
        if (!transaction) {
          const error = new Error("Transacción no encontrada");
          error.status = 404;
          return next(error);
        }
        res.json(transaction);
      })
      .catch((error) => next(error)); 
  });
  
  
  transbankRouter.post("/", (req, res, next) => {
    const newTransaction = new Transbank(req.body);
    newTransaction
      .save()
      .then((transaction) => res.status(201).json(transaction))
      .catch((error) => next(error)); 
  });
  
  transbankRouter.put("/:id", (req, res, next) => {
    const { id } = req.params;
    Transbank.findByIdAndUpdate(id, req.body, { new: true })
      .populate("guest")
      .then((updatedTransaction) => {
        if (!updatedTransaction) {
          const error = new Error("Transacción no encontrada");
          error.status = 404;
          return next(error);
        }
        res.json(updatedTransaction);
      })
      .catch((error) => next(error)); 
  });
  
 transbankRouter.delete("/:id", (req, res, next) => {
    const { id } = req.params;
    Transbank.findByIdAndDelete(id)
      .then((deletedTransaction) => {
        if (!deletedTransaction) {
          const error = new Error("Transacción no encontrada");
          error.status = 404;
          return next(error);
        }
        res.json({ message: "Transacción eliminada correctamente" });
      })
      .catch((error) => next(error)); 
  });
  
  module.exports = transbankRouter;