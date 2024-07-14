const jwt = require("jsonwebtoken");

const CustomError = require("../utils/error/CustomError");
const { UserRepository } = require("../repository");

const userRepository = new UserRepository();

async function createUser(data) {
    try {
        console.log("🚀 ~ signIn ~ data:", data);
        const response = await userRepository.createUser(data);

        const token = jwt.sign(
            {
                email: response.email,
                id: response._id,
            },
            "shhhhh",
            {
                expiresIn: "1h",
            }
        );

        let res = {
            token,
            email: response.email,
            userName: response.username,
        };

        return res;
    } catch (error) {
        throw error;
    }
}

async function signIn(data) {
    try {
        const response = await userRepository.signIn(data);

        const token = jwt.sign(
            {
                email: response.email,
                id: response._id,
            },
            "shhhhh",
            {
                expiresIn: "1h",
            }
        );

        let res = {};
        res.email = response.email;
        res.userName = response.username;
        res.token = token;

        return res;
    } catch (error) {
        throw new CustomError(error.message, error.statusCode);
    }
}

async function authorization(data) {
    try {
        const valid = jwt.verify(data.token, "shhhhh");

        if (!valid) throw new Error("token expired, please relogin");

        return valid;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    signIn,
    authorization,
};
