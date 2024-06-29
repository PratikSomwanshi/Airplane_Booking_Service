const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId: { type: Number, required: true },
    flightNumber: { type: String, required: true },
    seatNumber: { type: String, required: true },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
