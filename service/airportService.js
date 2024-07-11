const { StatusCodes } = require("http-status-codes");
const Airport = require("../model/Airport");
const City = require("../model/City");
const AirportRepository = require("../repository/AirportRepository");
const CustomError = require("../utils/error/CustomError");
const airportRepository = new AirportRepository();

const createAirport = async (airportData) => {
    const city = await City.findOne({
        city_id: airportData.cityId,
    });

    if (!city) {
        throw new CustomError("City not found", StatusCodes.NOT_FOUND);
    }

    const newAirportData = {
        name: airportData.name,
        code: airportData.code,
        cityId: city._id,
    };

    return airportRepository.create(newAirportData);
};

const getAirports = async () => {
    return airportRepository.findAll();
};

const getAirportById = async (id) => {
    const airport = await Airport.findOne({
        code: id,
    });

    if (!airport) {
        throw new CustomError("Airport not found", StatusCodes.NOT_FOUND);
    }

    return airport;
};

const updateAirport = async (id, updateData) => {
    const airport = await Airport.findOne({
        code: id,
    });

    if (!airport) {
        throw new CustomError("Airport not found", StatusCodes.NOT_FOUND);
    }

    return airportRepository.updateById(airport._id, updateData);
};

const deleteAirport = async (id) => {
    const airport = await Airport.findOne({
        code: id,
    });

    if (!airport) {
        throw new CustomError("Airport not found", StatusCodes.NOT_FOUND);
    }
    return airportRepository.deleteById(airport._id);
};

module.exports = {
    createAirport,
    getAirports,
    getAirportById,
    updateAirport,
    deleteAirport,
};
