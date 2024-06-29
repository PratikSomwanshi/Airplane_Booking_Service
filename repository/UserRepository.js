const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

const User = require("../model/User");
const CrudRepository = require("./crudrepository");

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async signIn(data) {
        try {
            console.log(data);
            const user = await User.findOne({ username: data.username });
            if (!user) throw Error("user not found");

            const validPass = bcrypt.compareSync(data.password, user.password);

            if (validPass) {
                return user;
            } else {
                throw Error("password does not match");
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserRepository;
