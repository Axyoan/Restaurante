const express = require('express');
const mongoose = require('mongoose');
const waiter = require('../models/waiter');
const Waiter = require("../models/waiter")
const router = express.Router();


///INDEX
router.get("/", async (req, res, next) => {
    try {
        const waiters = await Waiter.find({}).exec();
        res.json(waiters);
    } catch (err) {
        return next(err);
    }
});

///SHOW
router.get("/:id", async (req, res, next) => {
    try {
        const waiters = await Waiter.findById(req.params.id).exec();
        res.json(waiters);
    } catch (err) {
        return next(err);
    }
});

///CREATE
router.post("/", async (req, res, next) => {
    try {
        const newWaiter = new Waiter(req.body);
        await newWaiter.save();
        res.json(newWaiter);
    } catch (err) {
        return next(err);
    }
})

///UPDATE
router.put("/:id", async (req, res, next) => {
    try {
        const updatedWaiter = await waiter.findByIdAndUpdate(req.params.id, req.body).exec();
        res.json(updatedWaiter);
    } catch (err) {
        return next(err);
    }
})


///DESTROY
router.delete("/:id", async (req, res, next) => {
    try {
        const deletedWaiter = await waiter.findByIdAndDelete(req.params.id).exec();
        res.json(deletedWaiter);
    } catch (err) {
        return next(err);
    }
})

module.exports = router