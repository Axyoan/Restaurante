const express = require('express');
const mongoose = require('mongoose');
const Dish = require('../models/dish');
const router = express.Router();


///INDEX
router.get("/", async (req, res, next) => {
    try {
        const dishes = await Dish.find({}).exec();
        res.json(dishes);
    } catch (err) {
        return next(err);
    }
});

///SHOW
router.get("/:id", async (req, res, next) => {
    try {
        const dish = await Dish.findById(req.params.id).exec();
        res.json(dish);
    } catch (err) {
        return next(err);
    }
})

///CREATE
router.post("/", async (req, res, next) => {
    try {
        const newDish = new Dish(req.body);
        await newDish.save();
        res.json(newDish);
    } catch (err) {
        return next(err);
    }

});

///UPDATE
router.put("/:id", async (req, res, next) => {
    try {
        const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body).exec();
        res.json(updatedDish)
    } catch (err) {
        return next(err);
    }
});



///DESTROY
router.delete("/:id", async (req, res, next) => {
    try {
        const deletedDish = await Dish.findByIdAndDelete(req.params.id).exec();
        res.send(deletedDish);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;