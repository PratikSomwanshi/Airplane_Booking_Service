const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const CustomError = require("../utils/error/CustomError");

function signUpMiddleware(req, res, next) {
    try {
        if (!req.body.email) {
            throw new CustomError(
                "Email not present in upcoming request",
                StatusCodes.BAD_REQUEST
            );
        }

        if (!req.body.password) {
            throw new CustomError(
                "Password not present in upcoming request",
                StatusCodes.BAD_REQUEST
            );
        }

        if (!req.body.username) {
            throw new CustomError(
                "Username not present in upcoming request",
                StatusCodes.BAD_REQUEST
            );
        }

        next();
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.errorCode).json(ErrorResponse);
    }
}

module.exports = {
    signUpMiddleware,
};
