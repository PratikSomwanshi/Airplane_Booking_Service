const { StatusCodes } = require("http-status-codes");
const { paymentService } = require("../service");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
// flightNumber, seatNumber, customerEmail, amount
async function checkoutPayment(req, res) {
    try {
        const response = await paymentService.paymentCheckout({
            flightNumber: req.body.flightNumber,
            seatNumber: req.body.seatNumber,
            customerEmail: req.user.email,
        });

        SuccessResponse.data = {
            payment_link: response.url,
        };

        return res.json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = error.message;
        ErrorResponse.error = error;

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

module.exports = {
    checkoutPayment,
};
