const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    API_KEY: process.env.SECRETE_STRIPE_API,
    WEBHOOK_KEY: process.env.SECRETE_STRIPE_WEBHOOK_API,
};
