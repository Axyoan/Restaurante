const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
require("../reqError");
const Dish = require('../models/dish');

const validateId = async (id) => {
    if (!mongoose.isValidObjectId(id)) {
        return new ReqError("Not a valid id", 400);
    }
    const dish = await Dish.findById(id).exec();
    if (!dish) {
        throw new ReqError("Not found", 404);
    }
}

const validateFields = (req) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const image = req.body.image;
    if (!name || !description || !price || !category) {
        throw new ReqError("Missing information", 400);
    }
    if (isNaN(price) || parseInt(price) < 0) {
        throw new Error("Price must be a positive number", 400);
    }
    return true;
}


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
        validateId(req.params.id);
        const dish = await Dish.findById(req.params.id).exec();
        res.json(dish);
    } catch (err) {
        if (err instanceof ReqError)
            return res.status(err.status).send(err.msg);
        return next(err);
    }
})

///CREATE
router.post("/", async (req, res, next) => {
    try {
        validateFields(req);
        const newDish = new Dish(req.body);
        await Dish.create(newDish);
        res.json(newDish);
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
        const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body).exec();
        res.json(updatedDish)
    } catch (err) {
        console.log(err);
        if (err instanceof ReqError)
            return res.status(err.status).send(err.msg);
        return next(err);
    }
});


//PATCH
router.patch("/:id", async (req, res, next) => {
    try {
        validateId(req.params.id);
        const updatedDish = await Dish.findById(req.params.id);
        if (req.body.name) {
            await updatedDish.updateOne({ name: req.body.name });
        }
        if (req.body.description) {
            await updatedDish.updateOne({ description: req.body.description });
        }
        if (req.body.price) {
            await updatedDish.updateOne({ price: req.body.price });
        }
        if (req.body.category) {
            await updatedDish.updateOne({ category: req.body.category });
        }
        res.json(updatedDish)
    } catch (err) {
        console.log(err);
        if (err instanceof ReqError)
            return res.status(err.status).send(err.msg);
        return next(err);
    }
});

///DESTROY
router.delete("/:id", async (req, res, next) => {
    try {
        validateId(req.params.id);
        const deletedDish = await Dish.findByIdAndDelete(req.params.id).exec();
        res.send(deletedDish);
    } catch (err) {
        if (err instanceof ReqError)
            return res.status(err.status).send(err.msg);
        return next(err);
    }
});

module.exports = router;