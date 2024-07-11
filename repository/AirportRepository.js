const Airport = require("../model/Airport");
const BaseRepository = require("./BaseRepository");

class AirportRepository extends BaseRepository {
    constructor() {
        super(Airport);
    }

    async findAll() {
        return Airport.find().populate("cityId");
    }

    async findById(id) {
        return Airport.findById(id).populate("cityId");
    }

    async updateById(id, updateData) {
        return Airport.findByIdAndUpdate(id, updateData, {
            new: true,
        }).populate("cityId");
    }
}

module.exports = AirportRepository;
