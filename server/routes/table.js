const express = require("express");
const mongoose = require('mongoose');
const { exists, update } = require("../models/table");
const Table = require('../models/table');
const Waiter = require('../models/waiter');
const ReqError = require("../reqError");
const router = express.Router();

const validateId = async (id) => {
    if (!mongoose.isValidObjectId(id)) {
        return new ReqError("Not a valid id", 400);
    }
    const table = await Table.findById(id).exec();
    if (!table) {
        throw new ReqError("Not found", 404);
    }
}

const validateFields = (req) => {
    const code = req.body.code;
    const number = req.body.number;
    if (!number) {
        console.log("Missing information");
        throw new ReqError("Missing information", 400);
    }
    /*
    if (!code || !number) {
        console.log("Missing information");
        throw new ReqError("Missing information", 400);
    }
    if (!/^[A-Z]{4}$/.test(code)) {
        console.log("Not a valid code");
        throw new ReqError("Not a valid code", 400);
    }
    */
    ///Missing validation for dishes inside arrays
    console.log("data validated");
    return true;
}

const updateTables = async (waiters, table) => {
    if (waiters) {
        /**
         const newWaiters = [
            ...table.assignedWaiters,
            ...waiters.map(w => {
                return { waiterId: w.waiterId }
            }).filter(w => {
                const found = table.assignedWaiters.find(t => {
                    return t.waiterId === w.waiterId;
                });
                return !found;
            })
        ]
         */

        const newWaiters = [
            ...waiters.map(w => {
                return { waiterId: w.waiterId }
            })
        ]
        await table.updateOne({ assignedWaiters: newWaiters });
    }
    console.log("updated Tables");
}

///INDEX
router.get("/", async (req, res, next) => {
    try {
        const { code: queryCode } = req.query;
        const { number: queryNumber } = req.query;
        const { section: querySection } = req.query;
        if (queryCode) {
            const table = await Table.findOne({ code: queryCode }).exec();
            return res.json(table);
        }
        if (queryNumber) {
            const table = await Table.findOne({ number: queryNumber }).exec();
            return res.json(table);
        }
        if (querySection) {
            const tables = await Table.find({ section: querySection }).exec();
            return res.json(tables);
        }
        const tables = await Table.find({}).exec();
        res.json(tables);
    } catch (err) {
        if (err instanceof ReqError)
            return res.status(err.status).send(err.msg);
        return next(err);
    }
});

///SHOW
router.get("/:id", async (req, res, next) => {
    try {
        validateId(req.params.id);
        const table = await Table.findById(req.params.id).exec();
        res.json(table);
    } catch (err) {
        if (err instanceof ReqError)
            return res.status(err.status).send(err.msg);
        return next(err);
    }
});

///CREATE
router.post("/", async (req, res, next) => {
    try {
        validateFields(req);
        const newTable = new Table(req.body);
        let codeAlreadyExists = true;
        let newCode = "AAAA";
        while (codeAlreadyExists) {
            newCode = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            for (let i = 0; i < 4; i++) {
                newCode += characters.charAt(Math.floor(Math.random() *
                    characters.length));
            }
            const table = await Table.findOne({ code: newCode }).exec();
            if (table === null) {
                codeAlreadyExists = false;
            }
        }
        newTable.code = newCode;
        await newTable.save();
        res.json(newTable);
    } catch (err) {
        if (err instanceof ReqError)
            return res.status(err.status).send(err.msg);
        return next(err);
    }
});

///UPDATE
router.put("/:id", async (req, res, next) => {
    try {
        validateId(req.params.id);
        validateFields(req);
        const table = await Table.findById(req.params.id);
        await updateTables(req.body.assignedWaiters, table);
        const updatedTable = await Table.findByIdAndUpdate(req.params.id, req.body).exec();
        res.json(updatedTable);
    } catch (err) {
        if (err instanceof ReqError)
            return res.status(err.status).send(err.msg);
        return next(err);
    }
})

///PATCH
router.patch('/:id', async (req, res, next) => {
    try {
        const table = await Table.findById(req.params.id);
        if (req.body.assignedWaiters) {
            await updateTables(req.body.assignedWaiters, table);
        }
        if (req.body.code) {
            await table.updateOne({ code: req.body.code });
        }
        if (req.body.number) {
            await table.updateOne({ number: req.body.number });
        }
        if (req.body.currentOrder) {
            console.log("updating current order")
            const newCurrentOrder = { dishes: req.body.currentOrder, orderId: mongoose.Types.ObjectId() }
            await table.updateOne({ currentOrder: newCurrentOrder })
        }
        if (req.body.bill) {
            console.log("updating bill");
            console.log(req.body.bill);
            await table.updateOne({ bill: req.body.bill })
        }
        if (req.body.pendingOrders) {
            console.log("updating pending orders")
            await table.updateOne
                ({ pendingOrders: req.body.pendingOrders });
        }
        res.json(table);
    } catch (err) {
        if (err instanceof ReqError)
            return res.status(err.status).send(err.msg);
        return next(err);
    }
})

///DELETE
router.delete("/:id", async (req, res, next) => {
    try {
        validateId(req.params.id);
        const tableToDelete = await Table.findById(req.params.id).exec();
        for (const w of tableToDelete.assignedWaiters) {
            console.log(w);
            const waiterToUpdate = await Waiter.findById(w.waiterId);
            const newAssignedTables = [
                ...waiterToUpdate.assignedTables.filter(t => {
                    return t.tableId != req.params.id;
                })
            ];
            console.log(newAssignedTables);
            await waiterToUpdate.updateOne({ assignedTables: newAssignedTables });
        }
        const deletedTable = await Table.findByIdAndDelete(req.params.id).exec();
        res.json(deletedTable);
    } catch (err) {
        if (err instanceof ReqError)
            return res.status(err.status).send(err.msg);
        return next(err);
    }
})

module.exports = router;