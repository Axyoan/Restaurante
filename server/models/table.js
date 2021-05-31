const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TableSchema = new Schema({
    code: String,
    number: String,
    bill: {
        dishes: [
            {
                name: String,
                quantity: Number,
                price: Number
            }
        ]
    },
    pendingOrders: {
        order: [{
            dishes: [
                {
                    name: String,
                    quantity: Number,
                    price: Number
                }
            ]
        }]
    },
    currentOrder: {
        dishes: [
            {
                name: String,
                quantity: Number,
                price: Number
            }
        ]
    }
});

module.exports = mongoose.model("Table", TableSchema);