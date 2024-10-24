const rateModificationRouter = require("express").Router();
const {RateModification, Room} = require("../models/RateModification");

// Obtener todas todas las modificaciones
rateModificationsRouter.get("/", (req, res) => {
    RateModification.find({})
      .populate("room")
      .then((rateModifications) => res.json(rateModifications))
      .catch((error) => res.status(500).json({ error: "Error al obtener modificaciones de tarifa" }));
  });

// Obtener modificacion por el id
rateModificationRouter.get("/:id", (req, res, next) => {
  RateModification.findById(req.params.id)
    .populate('room')
    .then((existingModification) => {
      if (existingModification) {
        res.json(existingModification);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// Crear nuevas modificaciones
rateModificationRouter.post("/", (req, res, next) => {
  const body = req.body;

  if (!body.room || !body.startDate || !body.endDate || !body.modificationType || !body.value || !body.channel) {
    return res.status(400).json({ error: "Datos faltantes" });
  }

  const newModification = new RateModification({
    room: body.room,
    startDate: body.startDate,
    endDate: body.endDate,
    modificationType: body.modificationType,
    value: body.value,
    reason: body.reason || undefined,
    status: body.status || "PENDING",
    channel: body.channel,
    syncAttempts: body.syncAttempts || 0,
    lastSyncAttempt: body.lastSyncAttempt || undefined,
    syncError: body.syncError || undefined,
  });

  newModification
    .save()
    .then((savedModification) => {
      res.status(201).json(savedModification);
    })
    .catch((error) => next(error));
});

// Actualizar modificaciones por id
rateModificationRouter.put("/:id", (req, res, next) => {
  const body = req.body;

  RateModification.findById(req.params.id)
    .then((existingModification) => {
      if (!existingModification) {
        return res.status(404).end();
      }
      const rateModification = {
        room: body.room || existingRateModification.room,
        startDate: body.startDate || existingRateModification.startDate,
        endDate: body.endDate || existingRateModification.endDate,
        modificationType: body.modificationType || existingRateModification.modificationType,
        value: body.value || existingRateModification.value,
        reason: body.reason || existingRateModification.reason,
        status: body.status || existingRateModification.status,
        channel: body.channel || existingRateModification.channel,
        syncAttempts: body.syncAttempts || existingRateModification.syncAttempts,
        lastSyncAttempt: body.lastSyncAttempt || existingRateModification.lastSyncAttempt,
        syncError: body.syncError || existingRateModification.syncError
      };
     
    return RateModification.findByIdAndUpdate( req.params.id, rateModification,{ new: true })
        .then((updatedModification) => {res.json(updatedModification)})
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

// Eliminar por id
rateModificationsRouter.delete("/:id", (req, res, next) => {
    RateModification.findByIdAndDelete(req.params.id)
      .then((result) => {
        if (result) {
          res.status(204).end();
        } else {
          res.status(404).end();
        }
      })
      .catch((error) => next(error));
  });

module.exports = rateModificationRouter;
