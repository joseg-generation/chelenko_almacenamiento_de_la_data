const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  bookingReference: {
    type: String,
    required: true,
    unique: true
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guest',
    required: true
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW'],
    default: 'CONFIRMED'
  },
  totalPrice: {
    type: Number,
    required: true
  },
  channel: {
    type: String,
    enum: ['DIRECT', 'BOOKING'],
    required: true
  },
  channelReference: {
    type: String
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'PAID', 'PARTIALLY_PAID', 'REFUNDED'],
    default: 'PENDING'
  },
  specialRequests: {
    type: String
  },
  cancellationReason: {
    type: String
  },
  cancellationDate: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);