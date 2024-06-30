const express = require("express");
const morgan = require("morgan");
var cors = require("cors");
const oasTools = require("express-oas-generator");

const { ServerConfig } = require("./config");
const apiRoutes = require("./route");
const connectDB = require("./config/mongoDBConfig");

const app = express();

// http://localhost:8000/api-docs
oasTools.init(app, {});

app.use(cors());
app.use(morgan(":method :url :status :response-time ms :date[web]"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`running on port ${ServerConfig.PORT}`);
    await connectDB();
});
