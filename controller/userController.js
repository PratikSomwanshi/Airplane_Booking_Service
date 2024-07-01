const { StatusCodes } = require("http-status-codes");
const { userServices } = require("../service");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createUser(req, res) {
    try {
        const response = await userServices.createUser({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            fullName: req.body.fullName,
            address: req.body.address,
        });

        SuccessResponse.data = {
            email: response.email,
            userName: response.username,
        };
        SuccessResponse.message = "successfully created the user";

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = error.message;
        ErrorResponse.error = error;

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function signIn(req, res) {
    try {
        const response = await userServices.signIn({
            username: req.body.username,
            password: req.body.password,
        });

        SuccessResponse.data = response;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function authorization(req, res) {
    try {
        const response = await userServices.authorization({
            token: req.body.token,
        });
        return res.status(StatusCodes.OK).json({
            valid: true,
            init: moment(response.iat),
            now: moment(),
            expire: moment(response.exp),
        });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            valid: false,
        });
    }
}

module.exports = {
    createUser,
    signIn,
    authorization,
};
