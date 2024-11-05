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
  
  
transbankRouter.post("/", (req, res, net) => {
  const body = req.body;

  if (!body.guest || !body.vci || body.amount === undefined || !body.buyOrder || !body.sessionId ||
    !body.accountingDate || !body.transactionDate || !body.autorizationCode || !body.paymentTypeCode ||
    body.responseCode === undefined) {
  return res.status(400).json({ error: "Faltan datos obligatorios" });
}

const validStatusValues = ['INITIALIZED', 'AUTHORIZED', 'REVERSED', 'FAILED', 'NULLIFIED', 'PARTIALLY_NULLIFIED', 'CAPTURED'];
if (body.status && !validStatusValues.includes(body.status)) {
  return res.status(400).json({ error: "Estado no válido" });
}

const validPaymentTypes = ['VD', 'VN', 'VC', 'S1', 'S2', 'NC', 'VP'];
if (!validPaymentTypes.includes(body.paymentTypeCode)) {
  return res.status(400).json({ error: "Código de tipo de pago no válido" });
}

const transbank = new Transbank({
  guest: body.guest,
  vci: body.vci,
  amount: body.amount,
  status: body.status || 'INITIALIZED',
  buyOrder: body.buyOrder,
  sessionId: body.sessionId,
  cardDetail: body.cardDetail || {}, 
  accountingDate: body.accountingDate,
  transactionDate: body.transactionDate,
  authorizationCode: body.autorizationCode, 
  paymentTypeCode: body.paymentTypeCode,
  responseCode: body.responseCode,
  installmentsAmount: body.installmentsAmount || 0,
  installmentsNumber: body.installmentsNumber || 0, 
  balance: body.balance || 0, 
  reservation: body.reservation || null,
});

transbank
.save()
.then((savedTransbank) => res.status(201).json(savedTransbank))
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