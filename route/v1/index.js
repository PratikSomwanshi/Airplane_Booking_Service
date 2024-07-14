const express = require("express");
const router = express.Router();

const userRoute = require("./userRoute");
const flightRoute = require("./flightRoute");
const bookingRoute = require("./bookingRoute");
const paymentRoute = require("./paymentRoute");
const airplaneRoute = require("./airplaneRoute");
const airportRoute = require("./airportRoute");
const seatRoute = require("./seatRoute");

router.use(express.json());

router.use(express.urlencoded({ extended: true }));

router.use("/users", userRoute);

router.use("/flight", flightRoute);

router.use("/book", bookingRoute);

router.use("/payment", paymentRoute);

router.use("/airplane", airplaneRoute);

router.use("/airport", airportRoute);

router.use("/seat", seatRoute);

module.exports = router;
