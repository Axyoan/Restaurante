const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const TableSchema = new Schema({
    code: { type: String, unique: true, required: true },
    number: { type: String, unique: true, required: true },
    bill: {
        dishes: [
            {
                dishId: String,
                name: String,
                quantity: Number,
                price: Number
            }
        ]
    },
    ///pendingOrders = [{orderId, dishes = []}]
    pendingOrders:  
        ///default: [{ orderId: "", dishes: [] }],
        [{
            orderId: String,
            dishes: [{
                dishId: String,
                name: String,
                quantity: Number,
                price: Number
            }]
        }]
    ,
    currentOrder: {
        orderId: {
            type: mongoose.ObjectId,
        },
        dishes: [
            {
                dishId: String,
                name: String,
                quantity: Number,
                price: Number
            }
        ]
    },
    assignedWaiters: [{ waiterId: String }]
});

module.exports = mongoose.model("Table", TableSchema);