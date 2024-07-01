const express = require("express");
const router = express.Router();

const userRoute = require("./userRoute");
const flightRoute = require("./flightRoute");
const bookingRoute = require("./bookingRoute");
const paymentRoute = require("./paymentRoute");

router.use(express.json());

router.use(express.urlencoded({ extended: true }));

router.use("/users", userRoute);

router.use("/flight", flightRoute);

router.use("/book", bookingRoute);

router.use("/payment", paymentRoute);

module.exports = router;
