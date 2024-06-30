const router = require("express").Router();

const { flightController } = require("../../controller");
const authenticateJWT = require("../../middleware/jwtTokenVerifier");

router.post("/", flightController.createFlight);

router.get("/", flightController.getAllFlight);

router.get("/single/:id", flightController.getFlight);

router.get("/city", flightController.getFlightByCity);

router.put("/", flightController.updateFlight);

router.delete("/:id", flightController.deleteFlight);

module.exports = router;
