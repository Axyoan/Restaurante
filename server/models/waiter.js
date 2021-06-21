const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WaiterSchema = new Schema({
    name: {
        firstName: String,
        paternalLastName: String,
        maternalLastName: String,
    },
    isHeadWaiter: Boolean,
    birthDate: Date,
    startDate: Date,
    phone: String,
    address: String,
    email: String,
    image: Buffer,
    code: String,
    password: String,
    assignedTables: [{ tableId: String, }],
    notifications: [{
        category: {
            type: String,
            enum: ['cuenta', 'ayuda', 'orden']
        },
        tableNumber: String,
        tableCode: String,
        orderId:{
            type: String,
            default: null
        },
        resolved: Boolean,
    }
    ]
});

module.exports = mongoose.model("Waiter", WaiterSchema);