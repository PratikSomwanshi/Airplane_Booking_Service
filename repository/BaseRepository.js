class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async findAll() {
        try {
            const response = await this.model.find();
            return response;
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            const response = await this.model.findById(id);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async create(data) {
        try {
            const response = await this.model.create(data);

            return response;
        } catch (error) {
            throw error;
        }
    }

    // Update a response by ID
    async updateById(id, data) {
        try {
            const response = await this.model.findByIdAndUpdate(id, data, {
                new: true,
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Delete a response by ID
    async deleteById(id) {
        try {
            const response = await this.model.findByIdAndDelete(id);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BaseRepository;
