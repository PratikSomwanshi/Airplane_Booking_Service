const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
    flightNumber: { type: String, required: true, unique: true },
    airplane: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Airplane",
        required: true,
    },
    arrivalAirport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Airport",
        required: true,
    },
    departureAirport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Airport",
        required: true,
    },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    availableSeats: {
        type: Number,
        required: true,
    },
    amount: { type: Number, required: true },
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
