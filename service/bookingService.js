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

async function bookFlight(data) {
    const { flightNumber, seatNumber, userEmail } = data;

    try {
        if (!flightNumber) {
            throw Error("flight number not present");
        }

        const user = await User.findOne({ email: userEmail });
        if (!user) {
            throw new Error("User not found");
        }

        const flight = await Flight.findOne({ flightNumber });
        if (!flight) {
            throw new Error("Flight not found");
        }

        if (flight.availableSeats === 0) {
            throw new Error("No seats available on this flight");
        }

        console.log(seatNumber, flight._id);
        const seat = await Seat.findOneAndUpdate(
            { seatNumber, flight: flight._id, isBooked: false },
            { isBooked: true },
            { new: true }
        );

        if (!seat) {
            console.log(seat);
            throw new Error("Invalid seat provided");
        }

        const booking = new Booking({
            userEmail: user.email,
            flight: flight._id,
            seatNumber,
        });

        await booking.save();

        flight.seatsAvailable--;
        await flight.save();

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

module.exports = { bookFlight, getBooking, cancelBooking };
