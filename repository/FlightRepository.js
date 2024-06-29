const CrudRepository = require("./crudrepository");
const Flight = require("../model/Flight");

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }
}

module.exports = FlightRepository;
