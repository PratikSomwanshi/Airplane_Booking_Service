const express = require("express");
const router = express.Router();
const Seat = require("../../model/Seat");
const Flight = require("../../model/Flight");

router.get("/all/:flightId", async (req, res) => {
    try {
        const { flightId } = req.params;

        const flight = await Flight.findOne({
            flightNumber: flightId,
        });

        const seats = await Seat.find({ flight: flight._id });
        res.json(seats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
