const Airplane = require("../model/Airplane");
const BaseRepository = require("./BaseRepository");

class AirplaneRepository extends BaseRepository {
    constructor() {
        super(Airplane);
    }
}

module.exports = AirplaneRepository;
