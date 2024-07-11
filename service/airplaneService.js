const { StatusCodes } = require("http-status-codes");
const Airplane = require("../model/Airplane");
const AirplaneRepository = require("../repository/AirplaneRepository");
const CustomError = require("../utils/error/CustomError");

const airplaneRepository = new AirplaneRepository();

const createAirplane = async (airplaneData) => {
    const airplane = await Airplane.findOne({
        model: airplaneData.model,
    });

    if (airplane) {
        throw new CustomError(
            "Airplane with the same model already exists",
            StatusCodes.CONFLICT
        );
    }

    return airplaneRepository.create(airplaneData);
};

const getAirplanes = async () => {
    return airplaneRepository.findAll();
};

const getAirplaneById = async (id) => {
    try {
        const airplane = await Airplane.findOne({
            code: id,
        });
        if (!airplane) {
            throw new CustomError("Airplane not found", StatusCodes.NOT_FOUND);
        }

        return airplane;
    } catch (error) {
        throw error;
    }
};

const updateAirplane = async (id, updateData) => {
    const airplane = await Airplane.findOne({
        code: id,
    });

    if (!airplane) {
        throw new CustomError("Airplane not found", StatusCodes.NOT_FOUND);
    }

    return airplaneRepository.updateById(airplane._id, updateData);
};

const deleteAirplane = async (id) => {
    const airplane = await Airplane.findOne({
        code: id,
    });

    if (!airplane) {
        throw new CustomError("Airplane not found", StatusCodes.NOT_FOUND);
    }
    return airplaneRepository.deleteById(airplane._id);
};

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplaneById,
    updateAirplane,
    deleteAirplane,
};
