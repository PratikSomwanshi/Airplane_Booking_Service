const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flight",
        required: true,
    },
    seatNumber: { type: String, required: true },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
