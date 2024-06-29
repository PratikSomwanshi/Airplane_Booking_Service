class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    // Create a new user
    async createUser(data) {
        try {
            const user = await this.model.create(data);
            return user;
        } catch (error) {
            throw error;
        }
    }

    // Find a user by ID
    async findUserById(id) {
        try {
            const user = await this.model.findById(id);
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

module.exports = CrudRepository;
