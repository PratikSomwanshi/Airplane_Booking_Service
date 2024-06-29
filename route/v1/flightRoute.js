const router = require("express").Router();

const { flightController } = require("../../controller");

router.post("/", flightController.createFlight);

router.get("/", flightController.getAllFlight);

router.get("/:id", flightController.getFlight);

router.put("/", flightController.updateFlight);

router.delete("/:id", flightController.deleteFlight);

module.exports = router;
