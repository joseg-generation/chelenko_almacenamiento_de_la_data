const transbankRouter = require('express').Router();
const {Transbank,Guest} = require('../models/index');

transbankRouter.get('/', (req, res) => {
    Transbank.find({})
    .populate("guest")
    .then((transaction) => res.json (transaction))
    .catch((error) => res.status(500).json({ error: "Error al obtener las transacciones de Transbank" }) ); });

    transbankRouter.get("/:id", (req, res) => {
        const { id } = req.params
        Transbank.findById(id)
          .populate("guest") // Poblar la información del invitado
        .then((transaction) => {
            if (!transaction) {
            return res.status(404).json({ error: "Transacción no encontrada" });
            }
            res.json(transaction);     })
        .catch((error) => {
            res.status(500).json({ error: "Error al obtener la transacción" });
        });
    });

