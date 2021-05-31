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
    adress: String,
    email: String,
    assignedTables: [{
        tableId: mongoose.ObjectId
    }]
});

module.exports = mongoose.model("Waiter", WaiterSchema);