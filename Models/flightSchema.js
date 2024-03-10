const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    airline: {
        type: String,
        required: true,
      },
      airlineLogo: {
        type: String, // Assuming the logo is represented by a URL
        required: true,
      },
      flightNumber: {
        type: String,
        required: true,
      },
      departureAirport: {
        type: String,
        required: true,
      },
      destinationAirport: {
        type: String,
        required: true,
      },
      departureDate: {
        type: Date,
        required: true,
      },
      departureTime: {
        type: String, // You can choose the format that suits your needs (e.g., "HH:mm")
        required: true,
      },
      arrivalDate: {
        type: Date,
        required: true,
      },
      arrivalTime: {
        type: String, // You can choose the format that suits your needs (e.g., "HH:mm")
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      layover: {
        type: String,
      },
      duration: {
        type: String,
        required: true,
      },
      userId: {
        type: String,
        required: true,
      },
    });

    const flights = mongoose.model("flights",flightSchema)
    module.exports=flights