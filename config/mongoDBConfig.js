const mongoose = require("mongoose");
const serverConfig = require("./serverConfig");
const { seedCities } = require("../init/bulkInsertCity");
const { insertSeatsForFlight } = require("../init/bulkInsertSeat");

async function connectDB() {
    try {
        await mongoose.connect(serverConfig.MONGO_URL);
        await seedCities();
        await insertSeatsForFlight();
    } catch (error) {
        throw error;
    }
}

module.exports = connectDB;
