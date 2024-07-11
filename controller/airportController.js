const { StatusCodes } = require("http-status-codes");
const { airportService } = require("../service");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

const createAirport = async (req, res) => {
    try {
        const { name, code, cityId } = req.body;
        const airport = await airportService.createAirport({
            name,
            code,
            cityId,
        });

        SuccessResponse.message = "Airport created successfully";
        SuccessResponse.data = airport;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = { explanation: error.message };
        res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
};

const getAirports = async (req, res) => {
    try {
        const airports = await airportService.getAirports();

        SuccessResponse.message = "Airports retrieved successfully";
        SuccessResponse.data = airports;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = { explanation: error.message };
        res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
};

const getAirportById = async (req, res) => {
    try {
        const airport = await airportService.getAirportById(req.params.id);

        if (!airport) {
            ErrorResponse.error = { explanation: "Airport not found" };
            return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        }

        SuccessResponse.message = "Airport retrieved successfully";
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = { explanation: error.message };
        res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
};

const updateAirport = async (req, res) => {
    try {
        const { name, code, cityId } = req.body;
        const airport = await airportService.updateAirport(req.params.id, {
            name,
            code,
            cityId,
        });

        SuccessResponse.message = "Airport updated successfully";
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = { explanation: error.message };
        res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
};

const deleteAirport = async (req, res) => {
    try {
        const airport = await airportService.deleteAirport(req.params.id);

        SuccessResponse.message = "Airport deleted successfully";
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = { explanation: error.message };
        res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
};

module.exports = {
    createAirport,
    getAirports,
    getAirportById,
    updateAirport,
    deleteAirport,
};
