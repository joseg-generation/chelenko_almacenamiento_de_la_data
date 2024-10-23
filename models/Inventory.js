const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  availableUnits: {
    type: Number,
    required: true,
    min: 0
  },
  price: {
    type: Number,
    required: true
  },
  restrictions: {
    minStay: {
      type: Number,
      default: 1
    },
    maxStay: {
      type: Number
    },
    closedToArrival: {
      type: Boolean,
      default: false
    },
    closedToDeparture: {
      type: Boolean,
      default: false
    }
  },
  channel: {
    type: String,
    enum: ['DIRECT', 'BOOKING', 'ALL'],
    default: 'ALL'
  }
}, { timestamps: true });

inventorySchema.index({ room: 1, date: 1, channel: 1 }, { unique: true });

module.exports = mongoose.model('Inventory', inventorySchema);