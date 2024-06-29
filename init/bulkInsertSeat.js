const Flight = require("../model/Flight");
const Seat = require("../model/Seat");

async function insertSeatsForFlight() {
    const seatsData = [
        { seatNumber: "1A" },
        { seatNumber: "1B" },
        { seatNumber: "1C" },
        { seatNumber: "1D" },
        { seatNumber: "1E" },
    ];
    try {
        const count = await Seat.countDocuments();
        // Find all flights
        if (count === 0) {
            const flights = await Flight.find();

            // If no flights found, log and return
            if (flights.length === 0) {
                console.log("No flights found. No seats will be inserted.");
                return;
            }

            // Choose the first flight (you can choose based on any criteria here)
            const chosenFlight = flights[0];

            // Add flight reference to each seat data
            const seatsWithFlight = seatsData.map((seat) => ({
                ...seat,
                flight: chosenFlight._id,
            }));

            // Insert the seats in bulk
            await Seat.insertMany(seatsWithFlight);
            console.log("Seats inserted successfully:");
        } else {
            console.log("Seats already seeded");
        }
    } catch (error) {
        console.error("Error inserting seats:", error);
    }
}

module.exports = {
    insertSeatsForFlight,
};
