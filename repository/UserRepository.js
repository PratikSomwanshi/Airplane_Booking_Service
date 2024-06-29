const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

const User = require("../model/User");
const BaseRepository = require("./BaseRepository");

class UserRepository extends BaseRepository {
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

    async findUserById(id) {
        try {
            const user = await this.model.findById(id);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async createUser(data) {
        try {
            const existingUserName = await this.model.findOne({
                username: data.username,
            });

            const existingUserEmail = await this.model.findOne({
                email: data.email,
            });

            if (existingUserName) {
                throw Error("UserName already exist");
            }

            if (existingUserEmail) {
                throw Error("Email already registered");
            }

            const user = await this.model.create(data);
            return user;
        } catch (error) {
            throw error;
        }
    }

    // Update a user by ID
    async updateUserById(id, data) {
        try {
            const user = await this.model.findByIdAndUpdate(id, data, {
                new: true,
            });
            return user;
        } catch (error) {
            throw error;
        }
    }

    // Delete a user by ID
    async deleteUserById(id) {
        try {
            const user = await this.model.findByIdAndDelete(id);
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserRepository;
