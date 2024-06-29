const Flight = require("../model/Flight");
const BaseRepository = require("./BaseRepository");

class FlightRepository extends BaseRepository {
    constructor() {
        super(Flight);
    }
}

module.exports = FlightRepository;
