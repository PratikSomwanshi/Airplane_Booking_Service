const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  city_id: { type: String, required: true, unique: true },
  city_name: { type: String, required: true }
});

const City = mongoose.model('City', citySchema);

module.exports = City;
