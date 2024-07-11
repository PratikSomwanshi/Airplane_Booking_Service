const express = require("express");
const router = express.Router();

const { paymentController } = require("../../controller");

const authenticateJWT = require("../../middleware/jwtTokenVerifier");

router.post("/", authenticateJWT, paymentController.checkoutPayment);

module.exports = router;
