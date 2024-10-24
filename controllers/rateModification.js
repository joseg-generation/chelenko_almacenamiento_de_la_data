const rateModificationsRouter = require("express").Router();
const { RateModification, Room } = require("../models/index");

rateModificationsRouter.get("/", (req, res) => {
  RateModification.find({})
    .populate("room")
    .then((rateModifications) => res.json(rateModifications))
    .catch((error) => res.status(500).json({ error: "Error al obtener modificaciones de tarifa" }));
});

rateModificationsRouter.get("/:id", (req, res, next) => {
  RateModification.findById(req.params.id)
    .populate("room")
    .then((rateModification) => {
      if (rateModification) {
        res.json(rateModification);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

rateModificationsRouter.post("/", (req, res, next) => {
  const body = req.body;

  if (!body.room || !body.startDate || !body.endDate || !body.modificationType || !body.value || !body.channel) {
    return res.status(400).json({ error: "Datos faltantes" });
  }

  const rateModification = new RateModification({
    room: body.room,
    startDate: body.startDate,
    endDate: body.endDate,
    modificationType: body.modificationType,
    value: body.value,
    reason: body.reason || undefined,
    status: body.status || 'PENDING',
    channel: body.channel,
    syncAttempts: body.syncAttempts || 0,
    lastSyncAttempt: body.lastSyncAttempt || undefined,
    syncError: body.syncError || undefined
  });

  rateModification
    .save()
    .then((savedRateModification) => res.status(201).json(savedRateModification))
    .catch((error) => next(error));
});

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

rateModificationsRouter.put("/:id", (req, res, next) => {
  const body = req.body;

  RateModification.findById(req.params.id)
    .then((existingRateModification) => {
      if (!existingRateModification) {
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

      return RateModification.findByIdAndUpdate(req.params.id, rateModification, { new: true })
        .then((updatedRateModification) => res.json(updatedRateModification))
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

module.exports = rateModificationsRouter;
