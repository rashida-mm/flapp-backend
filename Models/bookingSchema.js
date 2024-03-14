
// Define Booking Schema
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  fullName: String,
  contactNumber: String,
  flight: {
    airline: String,
    flightNumber: String,
    airlineLogo: String,
    departureAirport: String,
    destinationAirport: String,
    departureDate: Date,
    departureTime: String,
    arrivalDate: Date,
    arrivalTime: String,
    classType: String,
    duration: String,
    layover: String
  },
});

// Create Booking Model
const Booking = mongoose.model('Booking', bookingSchema);

