const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    enum: ['SINGLE', 'DOUBLE', 'SUITE', 'DELUXE']
  },
  basePrice: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  amenities: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['AVAILABLE', 'OCCUPIED', 'MAINTENANCE', 'BLOCKED'],
    default: 'AVAILABLE'
  },
  description: {
    type: String
  },
  images: [{
    type: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);