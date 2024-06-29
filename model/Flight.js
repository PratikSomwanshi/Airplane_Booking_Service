const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
    flightNumber: { type: String, required: true, unique: true },
    arrivalCity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City",
        required: true,
    },
    departureCity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City",
        required: true,
    },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    availableSeats: {
        type: Number,
        required: true,
    },
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
