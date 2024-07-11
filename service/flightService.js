const Flight = require("../model/Flight");
const City = require("../model/City");
const { FlightRepository } = require("../repository");
const Airport = require("../model/Airport");
const Airplane = require("../model/Airplane");
const CustomError = require("../utils/error/CustomError");
const { StatusCodes } = require("http-status-codes");

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const arrivalAirport = await Airport.findOne({
            code: data.arrivalAirport,
        });
        const departureAirport = await Airport.findOne({
            code: data.departureAirport,
        });

        const airplane = await Airplane.findOne({
            code: data.airplaneCode,
        });

        if (!airplane) {
            throw new CustomError("Airplane not found", StatusCodes.NOT_FOUND);
        }

        if (!arrivalAirport) {
            throw Error("invalid arrival airport");
        }

        if (!departureAirport) {
            throw Error("invalid departure airport");
        }

        if (arrivalAirport == departureAirport) {
            throw Error("arrival and departure airport can not be same");
        }

        const existingFlight = await Flight.findOne({
            flightNumber: data.flightNumber,
        });

        if (existingFlight) {
            throw Error("Flight Already Present");
        }

        const newFlight = await flightRepository.create({
            flightNumber: data.flightNumber,
            airplane: airplane._id,
            arrivalAirport: arrivalAirport._id,
            departureAirport: departureAirport._id,
            departureTime: data.departureTime,
            arrivalTime: data.arrivalTime,
            availableSeats: airplane.capacity,
            amount: data.amount,
        });

        return newFlight;
    } catch (error) {
        console.error("Error creating flight:", error);
        throw error;
    }
}

async function getAllFlights() {
    try {
        const flights = await Flight.find()
            .populate({
                path: "arrivalAirport",
                select: "code name -_id",
                populate: {
                    path: "cityId",
                    select: "city_id city_name -_id",
                },
            })
            .populate({
                path: "departureAirport",
                select: "code name -_id",
                populate: {
                    path: "cityId",
                    select: "city_id city_name -_id",
                },
            });

        return flights;
    } catch (error) {
        console.error("Error fetching flights:", error);
        throw error;
    }
}

async function getFlight(id) {
    try {
        const flight = await Flight.findOne({
            flightNumber: id,
        })
            .populate("departureCity", "city_id city_name")
            .populate("arrivalCity", "city_id city_name");

        if (!flight) {
            return res.status(404).json({ message: "Flight not found" });
        }

        return flight;
    } catch (error) {
        throw error;
    }
}

async function updateFlight(data) {
    try {
        if (Object.keys(data).length === 0) {
            throw Error("Nothing to update");
        }

        if (!data.flightNumber) {
            throw Error("Flight Number not provided");
        }

        const response = Flight.findOneAndUpdate(
            { flightNumber: data.flightNumber },
            data,
            { new: true }
        );

        return response;
    } catch (error) {
        throw error;
    }
}

async function deleteFlight(flightNumber) {
    try {
        if (!flightNumber) {
            throw Error("Flight Number not provided");
        }

        const response = Flight.findOneAndDelete(
            { flightNumber: flightNumber },
            { new: true }
        );

        return response;
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

async function getFlightByCity(data) {
    try {
        const { arrivalCity, departureCity } = data;

        if (!arrivalCity || !departureCity) {
            throw Error("arrival city and departure city are required");
        }

        if (arrivalCity == departureCity) {
            throw Error("arrival city and departure city can not be same");
        }

        const fetchArrivalCity = await City.findOne({ city_id: arrivalCity });
        const fetchDepartureCity = await City.findOne({
            city_id: departureCity,
        });

        if (!fetchArrivalCity) {
            throw Error("Invalid arrival city");
        }

        if (!fetchDepartureCity) {
            throw Error("Invalid arrival city");
        }

        const flights = await Flight.find({
            arrivalCity: fetchArrivalCity._id,
            departureCity: fetchDepartureCity._id,
        })
            .populate("arrivalCity")
            .populate("departureCity");

        if (flights.length === 0) {
            throw Error("No flights found");
        }

        return flights;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateFlight,
    deleteFlight,
    getFlightByCity,
};
