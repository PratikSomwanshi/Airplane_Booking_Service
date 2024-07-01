const express = require("express");
const router = express.Router();

const { paymentController } = require("../../controller");

const authenticateJWT = require("../../middleware/jwtTokenVerifier");
const { stripeWebhook } = require("../../service/paymentService");
const bodyParser = require("body-parser");

router.post("/", authenticateJWT, paymentController.checkoutPayment);

module.exports = router;
