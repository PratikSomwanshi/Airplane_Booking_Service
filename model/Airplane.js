const mongoose = require("mongoose");

const airplaneSchema = new mongoose.Schema(
    {
        model: {
            type: String,
            required: true,
            unique: true,
        },
        code: {
            type: String,
            unique: true,
        },
        capacity: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

function generateAirplaneCode() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";

    const randomLetters = Array.from(
        { length: 2 },
        () => letters[Math.floor(Math.random() * letters.length)]
    ).join("");
    const randomNumbers = Array.from(
        { length: 3 },
        () => numbers[Math.floor(Math.random() * numbers.length)]
    ).join("");

    return `${randomLetters}${randomNumbers}`;
}

airplaneSchema.pre("save", async function (next) {
    if (this.isNew) {
        let uniqueCode;
        let isUnique = false;

        while (!isUnique) {
            uniqueCode = generateAirplaneCode();
            const existingAirplane = await Airplane.findOne({
                code: uniqueCode,
            });
            if (!existingAirplane) {
                isUnique = true;
            }
        }

        this.code = uniqueCode;
    }
    next();
});

const Airplane = mongoose.model("Airplane", airplaneSchema);

module.exports = Airplane;
