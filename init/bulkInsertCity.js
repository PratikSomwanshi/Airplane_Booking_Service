const City = require("../model/City");

const cities = [
    { city_id: "BLR", city_name: "Bangalore" },
    { city_id: "CHE", city_name: "Chennai" },
    { city_id: "KOL", city_name: "Kolkata" },
    { city_id: "PAR", city_name: "Paris" },
];

async function seedCities() {
    try {
        const count = await City.countDocuments();
        if (count === 0) {
            await City.deleteMany(); // Clear existing data (optional)
            await City.insertMany(cities); // Insert new data
            console.log("Cities seeded successfully");
        } else {
            console.log("Cities already seeded");
        }
    } catch (error) {
        console.error("Error seeding cities:", error);
    }
}

module.exports = { seedCities };
