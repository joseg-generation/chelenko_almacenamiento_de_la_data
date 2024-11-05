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
    const body = req.body;
    
    Transbank.findById(req.params.id)
      .then((existingTransbank) => {
       if (!existingTransbank) {
          return res.status(404).end();
        }
    const transbank = {
        guest: body.guest || existingTransbank.guest,
        vci: body.vci || existingTransbank.vci,
        amount: body.amount ||existingTransbank.amount,
        status: body.status ||existingTransbank.status,
        buyOrder: body.buyOrder ||existingTransbank.buyOrder,
        sessionId: body.sessionId ||existingTransbank.sessionId,
        cardDetail: body.cardDetail ||existingTransbank.cardDetail,
        accountingDate: body.accountingDate ||existingTransbank.accountingDate,
        transactionDate: body.transactionDate ||existingTransbank.transactionDate,
        authorizationCode: body.authorizationCode ||existingTransbank.authorizationCode,
        paymentTypeCode: body.paymentTypeCode ||existingTransbank.paymentTypeCode,
        responseCode: body.responseCode ||existingTransbank.responseCode,
        installmentsAmount: body.installmentsAmount ||existingTransbank.installmentsAmount,
        installmentsNumber: body.installmentsNumber ||existingTransbank.installmentsNumber,
        balance: body.balance ||existingTransbank.balance,
    }

    return Transbank.findByIdAndUpdate(req.params.id, transbank, {new: true})
    .then((updatedTransaction) => res.json(updatedTransaction))
    .catch((error) => next(error));
  })
  .catch((error) => next (error));
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