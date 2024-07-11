const Booking = require("../model/Booking");
const Flight = require("../model/Flight");
const User = require("../model/User");
const Seat = require("../model/Seat");

async function getBooking(userEmail) {
    try {
        const booking = await Booking.findOne({ userEmail }).populate({
            path: "flight",
            populate: [{ path: "arrivalCity" }, { path: "departureCity" }],
        });

        if (!booking) {
            throw Error("Booking not found");
        }

        return booking;
    } catch (error) {
        throw error;
    }
}

async function cancelBooking(data) {
    const { userEmail, seatNumber } = data;

    try {
        const booking = await Booking.findOneAndDelete(
            {
                userEmail,
                seatNumber,
            },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        await Seat.findOneAndUpdate(
            { seatNumber, isBooked: true },
            { isBooked: false }
        );

        return booking;
    } catch (error) {
        throw error;
    }
}

module.exports = { getBooking, cancelBooking };
