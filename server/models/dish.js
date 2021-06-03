const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DishSchema = new Schema({
    name: {type: String, required : true},
    description: {type: String, required : true},
    price: {type: Number, required : true},
    category: { type: String, lowercase: true },
    image: Buffer
});

module.exports = mongoose.model('Dish', DishSchema);