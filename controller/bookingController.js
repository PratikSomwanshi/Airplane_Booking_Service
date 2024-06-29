const { StatusCodes } = require("http-status-codes");
const { bookingService } = require("../service");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const CustomError = require("../utils/error/CustomError");

async function getBooking(req, res) {
    try {
        const response = await bookingService.getBooking(req.params.email);

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
        const response = await bookingService.bookFlight(req.body);

        SuccessResponse.data = response;
        SuccessResponse.message = "successfully created the Booking";

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = error.message;
        ErrorResponse.error = error;

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function cancelBooking(req, res) {
    try {
        const response = await bookingService.cancelBooking(req.query);

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
