const mongoose = require('mongoose');

const rateModificationSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  modificationType: {
    type: String,
    enum: ['PRICE_CHANGE', 'RESTRICTION_CHANGE', 'AVAILABILITY_CHANGE'],
    required: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  reason: {
    type: String
  },
  status: {
    type: String,
    enum: ['PENDING', 'SYNCED', 'FAILED'],
    default: 'PENDING'
  },
  channel: {
    type: String,
    enum: ['DIRECT', 'BOOKING', 'ALL'],
    required: true
  },
  syncAttempts: {
    type: Number,
    default: 0
  },
  lastSyncAttempt: {
    type: Date
  },
  syncError: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('RateModification', rateModificationSchema);