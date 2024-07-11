const { StatusCodes } = require("http-status-codes");
const { airplaneService } = require("../service");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

const createAirplane = async (req, res) => {
    try {
        const { model, code, capacity } = req.body;
        const airplane = await airplaneService.createAirplane({
            model,
            code,
            capacity,
        });

        SuccessResponse.message = "Airplane created successfully";
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = { explanation: error.message };
        res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
};

const getAirplanes = async (req, res) => {
    try {
        const airplanes = await airplaneService.getAirplanes();

        SuccessResponse.message = "Airplanes retrieved successfully";
        SuccessResponse.data = airplanes;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = { explanation: error.message };
        res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
};

const getAirplaneById = async (req, res) => {
    try {
        const airplane = await airplaneService.getAirplaneById(req.params.id);

        if (!airplane) {
            ErrorResponse.error = { explanation: "Airplane not found" };
            return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        }

        SuccessResponse.message = "Airplane retrieved successfully";
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = { explanation: error.message };
        res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
};

const updateAirplane = async (req, res) => {
    try {
        const { model, code, capacity } = req.body;
        const airplane = await airplaneService.updateAirplane(req.params.id, {
            model,
            code,
            capacity,
        });

        if (!airplane) {
            ErrorResponse.error = { explanation: "Airplane not found" };
            return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        }

        SuccessResponse.message = "Airplane updated successfully";
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = { explanation: error.message };
        res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
};

const deleteAirplane = async (req, res) => {
    try {
        const airplane = await airplaneService.deleteAirplane(req.params.id);

        SuccessResponse.message = "Airplane deleted successfully";
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = { explanation: error.message };
        res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
};

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplaneById,
    updateAirplane,
    deleteAirplane,
};
