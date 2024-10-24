const reservationsRouter = require("express").Router();
const { Reservation, Guest, Room } = require("../models/index");

reservationsRouter.get("/", (req, res) => {
  Reservation.find({})
    .populate("guest")
    .populate("room")
    .then((reservations) => res.json(reservations))
    .catch((error) => res.status(500).json({ error: "Error al obtener reservas" }));
});

reservationsRouter.get("/:id", (req, res, next) => {
  Reservation.findById(req.params.id)
    .populate("guest")
    .populate("room")
    .then((reservation) => {
      if (reservation) {
        res.json(reservation);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

reservationsRouter.post("/", (req, res, next) => {
  const body = req.body;

  if (!body.bookingReference || !body.guest || !body.room || !body.checkIn || !body.checkOut || !body.totalPrice || !body.channel) {
    return res.status(400).json({ error: "Datos faltantes" });
  }

  const reservation = new Reservation({
    bookingReference: body.bookingReference,
    guest: body.guest,
    room: body.room,
    checkIn: body.checkIn,
    checkOut: body.checkOut,
    status: body.status || 'CONFIRMED',
    totalPrice: body.totalPrice,
    channel: body.channel,
    channelReference: body.channelReference || undefined,
    paymentStatus: body.paymentStatus || 'PENDING',
    specialRequests: body.specialRequests || undefined,
    cancellationReason: body.cancellationReason || undefined,
    cancellationDate: body.cancellationDate || undefined
  });

  reservation
    .save()
    .then((savedReservation) => res.status(201).json(savedReservation))
    .catch((error) => next(error));
});

reservationsRouter.delete("/:id", (req, res, next) => {
  Reservation.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

reservationsRouter.put("/:id", (req, res, next) => {
  const body = req.body;

  Reservation.findById(req.params.id)
    .then((existingReservation) => {
      if (!existingReservation) {
        return res.status(404).end();
      }

      const reservation = {
        bookingReference: body.bookingReference || existingReservation.bookingReference,
        guest: body.guest || existingReservation.guest,
        room: body.room || existingReservation.room,
        checkIn: body.checkIn || existingReservation.checkIn,
        checkOut: body.checkOut || existingReservation.checkOut,
        status: body.status || existingReservation.status,
        totalPrice: body.totalPrice || existingReservation.totalPrice,
        channel: body.channel || existingReservation.channel,
        channelReference: body.channelReference || existingReservation.channelReference,
        paymentStatus: body.paymentStatus || existingReservation.paymentStatus,
        specialRequests: body.specialRequests || existingReservation.specialRequests,
        cancellationReason: body.cancellationReason || existingReservation.cancellationReason,
        cancellationDate: body.cancellationDate || existingReservation.cancellationDate
      };

      return Reservation.findByIdAndUpdate(req.params.id, reservation, { new: true })
        .then((updatedReservation) => res.json(updatedReservation))
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

module.exports = reservationsRouter;
