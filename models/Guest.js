const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  nationality: {
    type: String
  },
  documentType: {
    type: String,
    enum: ['PASSPORT', 'ID', 'DRIVERS_LICENSE']
  },
  documentNumber: {
    type: String
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String
  },
  preferences: {
    type: Map,
    of: String
  },
  blacklisted: {
    type: Boolean,
    default: false
  },
  blacklistReason: {
    type: String
  }
}, { timestamps: true });

guestSchema.index({ email: 1 });

module.exports = mongoose.model('Guest', guestSchema);