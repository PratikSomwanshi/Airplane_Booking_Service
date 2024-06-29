const CrudRepository = require("./crudrepository");
const City = require("../model/City");

class CityRepository extends CrudRepository {
    constructor() {
        super(City);
    }
}

module.exports = CityRepository;
