const reservationRouter = express.Router();
const { Reservation } = require('../models/index');

// Obtener la lista completa de reservaciones
reservationRouter.get('/', (req, res, next) => {
    Reservation.find({})
        .populate('guest room') // Esto permitirá llenar automáticamente los datos del invitado y la habitación referenciada
        .then(reservations => {
            res.json(reservations);
        })
        .catch(error => next(error));
});

// Obtener una reservación por su id
reservationRouter.get('/:id', (req, res, next) => {
    Reservation.findById(req.params.id)
        .populate('guest room') // Completa los datos referenciados
        .then(existingReservation => {
            if (existingReservation) {
                res.json(existingReservation);
            } else {
                res.status(404).end();
            }
        })
        .catch(error => next(error));
});

// Crear una nueva reservación
reservationRouter.post('/', (req, res, next) => {
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
        cancellationDate: body.cancellationDate || undefined,
    });

    reservation
    .save()
    .then(savedReservation => {res.status(201).json(savedReservation);})
    .catch(error => next(error));
});

// Actualizar una reservación existente
reservationRouter.put('/:id', (req, res, next) => {
    const body = req.body;

    Reservation.findById(req.params.id)
        .then(existingReservation => {
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

            return Reservation.findByIdAndUpdate(req.params.id, updatedReservation, { new: true })
                .then(updatedReservation => {res.json(updatedReservation);})
                .catch(error => next(error));
        })
        .catch(error => next(error));
});

// Eliminar una reservación
reservationRouter.delete('/:id', (req, res, next) => {
    Reservation.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch(error => next(error));
});

module.exports = reservationRouter;
