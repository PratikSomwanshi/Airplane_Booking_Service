const router = require("express").Router();

const userRoute = require("./userRoute");
const flightRoute = require("./flightRoute");
const bookingRoute = require("./bookingRoute");

router.use("/users", userRoute);

router.use("/flight", flightRoute);

router.use("/book", bookingRoute);

module.exports = router;
