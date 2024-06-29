const router = require("express").Router();

const { bookingController } = require("../../controller");

router.post("/", bookingController.createBooking);

router.get("/:email", bookingController.getBooking);

module.exports = router;
