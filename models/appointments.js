// importing mongoose
const mongoose = require("mongoose");

// using mongo schema
const Schema = mongoose.Schema;

// defining the schema
const appointmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  consultant: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

// defining the model
const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
