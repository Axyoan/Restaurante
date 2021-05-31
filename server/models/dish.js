const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DishSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
});

module.exports = mongoose.model('Dish', DishSchema);