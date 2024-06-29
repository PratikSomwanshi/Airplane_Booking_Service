const mongoose = require("mongoose");
const serverConfig = require("./serverConfig");
const { seedCities } = require("../init/bulkInsertCity");

async function connectDB() {
    try {
        await mongoose.connect(serverConfig.MONGO_URL);
        await seedCities();
    } catch (error) {
        throw error;
    }
}

module.exports = connectDB;
