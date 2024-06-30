const jwt = require("jsonwebtoken");
const { ErrorResponse } = require("../utils/common");
const { StatusCodes } = require("http-status-codes");

const authenticateJWT = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        ErrorResponse.error = {
            explanation: "Access Denied",
        };

        return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
    }

    try {
        const decoded = jwt.verify(token, "shhhhh");
        req.user = decoded;

        console.log(decoded.email);
        next();
    } catch (e) {
        ErrorResponse.error = {
            explanation: "Invalid Token",
        };

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
};

module.exports = authenticateJWT;
