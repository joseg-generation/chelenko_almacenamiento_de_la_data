const reservaSchema = new mongoose.Schema({
  book_number: {
    type: String,
    required: true,
    minLength: 3,
  },
  booke_by: {
    type: String,
    required: true,
    minLength: 3,
  },
  guest_name: {
    type: String,
    required: true,
    minLength: 3,
  },
  check_in: {
    type: Date,
    required: tru,
    minLength: 3,
  },
  check_out: {
    type: Date,
    required: true,
    minLength: 3,
  },
  booked_on: {
    type: Date,
    defacult: Date.now,
  },
  status: {
    type: Date,
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  },
  people: {
    type: Number,
    required: true,
  },
  adults: {
    type: Number,
    required: true,
  },
  children: {
    type: Number,
    required: true,
  },
  children_age: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  commission: {
    type: Number,
    required: true,
  },
  commission_amount: {
    type: Number,
    required: true,
  },
  Payment_status: {
    type: String,
    required: true,
  },
  Payment_method: {
    type: String,
    required: true,
  },
  Remarks: {
    type: String,
    required: true,
  },
  booker_gropu: {
    type: String,
    required: true,
  },
  booker_country: {
    type: String,
    required: true,
  },
 travel_purpose: {
    type: String,
    required: true,
  },
  device: {
    type: String,
    required: true,
  },
  unit_type: {
    type: String,
    required: true,
  },

  duration: {
    type: String,
    required: true,
  },
 cancellation_address: {
    type: Date,
    required: true,
  },
  phone_number: {
    type: String,
  } 
});

reservaSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject.idtoString();
    delete returnedObject._id;
    delete returnedObject._v;
  },
});

module.exports = mongoose.model("Reserva", reservaSchemaSchema);
