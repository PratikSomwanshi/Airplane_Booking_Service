const express = require("express");
const morgan = require("morgan");
var cors = require("cors");

const { ServerConfig } = require("./config");
const apiRoutes = require("./route");
const connectDB = require("./config/mongoDBConfig");
const { stripeWebhook } = require("./service/paymentService");
const bodyParser = require("body-parser");

const app = express();


app.use(cors());
app.use(morgan(":method :url :status :response-time ms :date[web]"));

app.use("/api", apiRoutes);
app.post(
    "/webhook",
    bodyParser.raw({ type: "application/json" }),
    stripeWebhook
);

app.listen(ServerConfig.PORT, async () => {
    console.log(`running on port ${ServerConfig.PORT}`);
    await connectDB();
});
