const router = require("express").Router();

const { bookingController } = require("../../controller");
const authenticateJWT = require("../../middleware/jwtTokenVerifier");

router.get("/", authenticateJWT, bookingController.getBooking);

router.delete("/", authenticateJWT, bookingController.cancelBooking);

module.exports = router;
