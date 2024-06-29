const City = require("../model/City");
const BaseRepository = require("./BaseRepository");

class CityRepository extends BaseRepository {
    constructor() {
        super(City);
    }
}

module.exports = CityRepository;
