const Flight = require("../model/Flight");
const City = require("../model/City");
const { FlightRepository } = require("../repository");

const flightRepository = new FlightRepository();

async function createFlight() {
    try {
        const arrivalCity = await City.findOne({ city_id: "BLR" });
        const departureCity = await City.findOne({ city_id: "CHE" });

        if (!arrivalCity) {
            throw Error("invalid arrival city");
        }

        if (!departureCity) {
            throw Error("invalid departure city");
        }

        if (arrivalCity == departureCity) {
            throw Error("arrival and departure city can not be same");
        }

        const newFlight = await flightRepository.create({
            flightNumber: "FL123",
            arrivalCity: arrivalCity._id,
            departureCity: departureCity._id,
            departureTime: new Date(),
            arrivalTime: new Date(),
            totalSeats: 150,
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
            .populate("arrivalCity", "city_id city_name")
            .populate("departureCity", "city_id city_name");

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

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateFlight,
    deleteFlight,
};
