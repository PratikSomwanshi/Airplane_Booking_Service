const { StatusCodes } = require("http-status-codes");
const { flightService } = require("../service");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const CustomError = require("../utils/error/CustomError");

async function createUser(req, res) {
    try {
        const response = await flightService.createFlight(req.body);

        SuccessResponse.data = response;
        SuccessResponse.message = "successfully created the Flight";

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = error.message;
        ErrorResponse.error = error;

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function getAllFlight(req, res) {
    try {
        const response = await flightService.getAllFlights();

        SuccessResponse.data = response;
        SuccessResponse.message = "successfully created the Flight";

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = error.message;
        ErrorResponse.error = error;

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function getFlight(req, res) {
    try {
        const response = await flightService.getFlight(req.params.id);

        SuccessResponse.data = response;
        SuccessResponse.message = "successfully fetched the Flight";

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = error.message;
        ErrorResponse.error = error;

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function updateFlight(req, res) {
    try {
        const response = await flightService.updateFlight(req.body);

        SuccessResponse.data = response;
        SuccessResponse.message = "successfully updated the Flight";

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.error = {
            explanation: error.message,
        };

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function deleteFlight(req, res) {
    try {
        const response = await flightService.deleteFlight(req.params.id);

        SuccessResponse.data = response;
        SuccessResponse.message = "successfully deleted the Flight";

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.error = {
            explanation: error.message,
        };

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

module.exports = {
    createUser,
    getAllFlight,
    getFlight,
    updateFlight,
    deleteFlight,
};
