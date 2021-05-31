const express = require('express');
const crypto = require("crypto");
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
var generator = require('generate-password');
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
        const code = crypto.randomInt(0, 1000000);
        const pass = generator.generate({
            length: 8,
            excludeSimilarCharacters: true,
            numbers: true,
            symbols: true,
            strict: true,
        });
        newWaiter.code = code;
        newWaiter.password = pass;
        await newWaiter.save();
        const transporter = nodemailer.createTransport({
            host: `${process.env.GMAIL_SERVICE_HOST}`,
            port: `${process.env.GMAIL_SERVICE_PORT}`,
            secure: `${process.env.GMAIL_SERVICE_SECURE}`,
            service: `${process.env.GMAIL_SERVICE_NAME}`,
            auth: {
                user: `${process.env.GMAIL_USER_NAME}`,
                pass: `${process.env.GMAIL_USER_PASSWORD}`,
            },
        });
        const mailOptions = {
            from: 'Restaurante',
            to: req.body.email,
            subject: 'Credenciales',
            text: 'Estas son suscredenciales',
            html: `<h1>No comparta sus credenciales con nadie</h1>
                <h2>Código: ${code}</h2>
                <h2>Contraseña: ${pass} </h2>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
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