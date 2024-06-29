const router = require("express").Router();

const userRoute = require("./userRoute");
const flightRoute = require("./flightRoute");

router.use("/users", userRoute);

router.use("/flight", flightRoute);

module.exports = router;
