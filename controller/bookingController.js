const { StatusCodes } = require("http-status-codes");
const { bookingService } = require("../service");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const CustomError = require("../utils/error/CustomError");

async function getBooking(req, res) {
    try {
        const response = await bookingService.getBooking(req.user.email);

        SuccessResponse.data = response;
        SuccessResponse.message = "successfully fetch the Booking";

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = {
            explanation: error.message,
        };

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function createBooking(req, res) {
    try {
        const data = { ...req.body, userEmail: req.user.email };
        const response = await bookingService.bookFlight(data);

        SuccessResponse.data = response;
        SuccessResponse.message = "successfully created the Booking";

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = {
            explanation: error.message,
        };

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function cancelBooking(req, res) {
    try {
        const data = { ...req.query, userEmail: req.user.email };
        const response = await bookingService.cancelBooking(data);

        SuccessResponse.data = response;
        SuccessResponse.message = "successfully deleted the Booking";

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error.message;

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

module.exports = {
    createBooking,
    getBooking,
    cancelBooking,
};
