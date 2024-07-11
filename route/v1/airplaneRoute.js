const router = require("express").Router();

const { airportController } = require("../../controller");
const authenticateJWT = require("../../middleware/jwtTokenVerifier");

router.get(
    "/",
    authenticateJWT,
    authenticateJWT,
    airportController.getAirports
);

router.get("/:id", authenticateJWT, airportController.getAirportById);

router.post("/", authenticateJWT, airportController.createAirport);

router.put("/:id", authenticateJWT, airportController.updateAirport);

router.delete("/:id", authenticateJWT, airportController.deleteAirport);

module.exports = router;
