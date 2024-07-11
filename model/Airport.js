const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const airportSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
            unique: true,
        },
        cityId: {
            type: Schema.Types.ObjectId,
            ref: "City",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Airport = mongoose.model("Airport", airportSchema);

module.exports = Airport;
