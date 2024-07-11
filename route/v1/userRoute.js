const router = require("express").Router();

const { userController } = require("../../controller");

const {
    userSingInMiddleware,
    userSingUpMiddleware,
} = require("../../middleware");

router.post(
    "/signup",
    userSingUpMiddleware.signUpMiddleware,
    userController.createUser
);

router.post(
    "/signin",
    userSingInMiddleware.signInMiddleware,
    userController.signIn
);

router.post("/auth", userController.authorization);

module.exports = router;
