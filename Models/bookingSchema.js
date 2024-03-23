
// Define Booking Schema
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
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
  passengerDetails: [{ // Array of passenger details
    fullName: String,
    contactNumber: String
  }]
});

const bookings = mongoose.model("bookings",bookingSchema)
    module.exports=bookings
