const cron = require('node-cron');
const {Reservation} = require('../models/index')
const {logReservation} = require('./historicalStorage')
const logger = require('./logger')


cron.schedule(process.env.CRON_SCHEDULE, async () => {
    const monthsToExpire = parseInt(process.env.EXPIRE_TIME, 10) || 3;
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() - monthsToExpire);

    try {
        const expiredReservations = await Reservation.find({ checkOut: { $lt: expirationDate } });
        expiredReservations.forEach(reservation => {
            logReservation(reservation)
            Reservation.findByIdAndDelete(reservation._id).catch(console.error)
        })
        logger.info(`${expiredReservations.length} reservas derivadas a almacenamiento historico`)
    } catch (error) {
        logger.error('Error al procesar reservas expiradas:', error)
    }
})