const mongoose = require('mongoose');

const transbankSchema = new mongoose.Schema({
guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guest',
    required: true
},
vci: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['INITIALIZED', 'AUTHORIZED', 'REVERSED', 'FAILED', 'NULLIFIED', 'PARTIALLY_NULLIFIED', 'CAPTURED'],
    default: 'INITIALIZED'
  },
  buyOrder: {
    type: String,
    required: true
  },
  sessionId: {
    type: String,
    required: true
  },
  cardDetail: {
    cardNumber: {
        type: Number,
        maxLength: 19
    }
  },
  accountingDate: {
    type: String,
    maxLength: 4,
    required: true
  },
  transactionDate: {
    type: Date,
    required: true
  },
  autorizationCode: {
    type: String,
    maxLength: 6,
    required: true
  },
  paymentTypeCode: {
    type: String,
    required: true,
    enum: ['VD', 'VN', 'VC', 'S1', 'S2', 'NC', 'VP']
  },
  responseCode: {
    type: Number,
    required: true
  },
  installmentsAmount: {
    type: Number,
    maxLength: 17
  },
  installmentsNumber: {
    type: Number,
    maxLength: 2,
    default: 0
  },
  balance: {
    type: Number,
    maxLength: 17
  },
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation'
  }  
}, { timestamps: true });

module.exports = mongoose.model('Transbank', transbankSchema);