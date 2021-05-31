const express = require("express");
const mongoose = require('mongoose');
const Table = require('../models/table');
const router = express.Router();

///INDEX
router.get("/", async (req, res, next) => {
    try {
        const tables = await Table.find({}).exec();
        res.json(tables);
    } catch (err) {
        return next(err);
    }
});

///SHOW
router.get("/:id", async (req, res, next) => {
    try {
        const table = await Table.findById(req.params.id).exec();
        res.json(table);
    } catch (err) {
        return next(err);
    }
});

///CREATE
router.post("/", async (req, res, next) => {
    try {
        const newTable = new Table(req.body);
        await newTable.save();
        res.json(newTable);
    } catch (err) {
        return next(err);
    }
})
///UPDATE
router.put("/:id", async (req, res, next) => {
    try {
        const updatedTable = await Table.findByIdAndUpdate(req.params.id, req.body).exec();
        res.json(updatedTable);
    } catch (err) {
        return next(err);
    }
})

///DELETE
router.delete("/:id", async (req, res, next) => {
    try {
        const deletedTable = await Table.findByIdAndDelete(req.params.id).exec();
        res.json(deletedTable);
    } catch (err) {
        return next(err);
    }
})

module.exports = router;