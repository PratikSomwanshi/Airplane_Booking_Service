const router = require("express").Router();

const { bookingController } = require("../../controller");

router.post("/", bookingController.createBooking);

router.get("/:email", bookingController.getBooking);

router.delete("/", bookingController.cancelBooking);

module.exports = router;
