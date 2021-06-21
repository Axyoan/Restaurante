const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const generator = require('generate-password');
require("../reqError");
const Waiter = require('../models/waiter');


validateId = async (id) => {
    if (!mongoose.isValidObjectId(id)) {
        return new ReqError("Not a valid id", 400);
    }
    waiter = await Waiter.findById(id).exec();
    if (!waiter) {
        throw new ReqError("Not found", 404);
    }
}

validateFields = async (req) => {
    const required = {
        name: {
            firstName: req.body.name.firstName,
            paternalLastName: req.body.name.paternalLastName,
            maternalLastName: req.body.name.maternalLastName,
        },
        isHeadWaiter: req.body.isHeadWaiter,
        birthDate: req.body.birthDate,
        startDate: req.body.startDate,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
    }
    image = req.body.image;
    for (const el in required) {
        if (!required[el]) {
            throw new ReqError("Missing information", 400);
        }
    }
    ///Missing validation for dishes inside arrays

    return true;
}

///INDEX
router.get("/", async (req, res, next) => {
    try {
        const { tableId, queryCode: code } = req.query;
        if (tableId) {
            const waiters = await Waiter.find(
                { assignedTables: { $elemMatch: { tableId: tableId } } }).exec();
            return res.json(waiters);
        }
        if (code) {
            const waiters = await Waiter.findOne(
                { code: queryCode }
            )
            return res.json(waiters);
        }
        waiters = await Waiter.find({}).exec();
        res.json(waiters);
    } catch (err) {
        return next(err);
    }
});

///SHOW
router.get("/:id", async (req, res, next) => {
    try {
        waiters = await Waiter.findById(req.params.id).exec();
        res.json(waiters);
    } catch (err) {
        return next(err);
    }
});

///CREATE
router.post("/", async (req, res, next) => {
    try {
        newWaiter = new Waiter(req.body);
        code = crypto.randomInt(100000, 1000000);
        pass = generator.generate({
            length: 8,
            excludeSimilarCharacters: true,
            numbers: true,
            symbols: true,
            strict: true,
        });
        newWaiter.code = code;
        newWaiter.password = pass;
        await newWaiter.save();
        transporter = nodemailer.createTransport({
            host: `${process.env.GMAIL_SERVICE_HOST}`,
            port: `${process.env.GMAIL_SERVICE_PORT}`,
            secure: `${process.env.GMAIL_SERVICE_SECURE}`,
            service: `${process.env.GMAIL_SERVICE_NAME}`,
            auth: {
                user: `${process.env.GMAIL_USER_NAME}`,
                pass: `${process.env.GMAIL_USER_PASSWORD}`,
            },
        });
        mailOptions = {
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
        updatedWaiter = await Waiter.findByIdAndUpdate(req.params.id, req.body).exec();
        res.json(updatedWaiter);
    } catch (err) {
        return next(err);
    }
})

///PATCH
router.patch("/:id", async (req, res, next) => {
    try {
        console.log("patch waiter")
        updatedWaiter = await Waiter.findById(req.params.id).exec();
        if (req.body.name) {
            await updatedWaiter.updateOne({ name: req.body.name });
        }
        if (req.body.isHeadWaiter) {
            await updatedWaiter.updateOne({ isHeadWaiter: req.body.isHeadWaiter });
        }
        if (req.body.birthDate) {
            await updatedWaiter.updateOne({ birthDate: req.body.birthDate });
        }
        if (req.body.startDate) {
            await updatedWaiter.updateOne({ startDate: req.body.startDate });
        }
        if (req.body.phone) {
            await updatedWaiter.updateOne({ phone: req.body.phone });
        }
        if (req.body.address) {
            await updatedWaiter.updateOne({ address: req.body.address });
        }
        if (req.body.email) {
            await updatedWaiter.updateOne({ email: req.body.email });
        }
        if (req.body.image) {
            await updatedWaiter.updateOne({ image: req.body.image });
        }
        if (req.body.code) {
            await updatedWaiter.updateOne({ code: req.body.code });
        }
        if (req.body.password) {
            await updatedWaiter.updateOne({ password: req.body.password });
        }
        if (req.body.assignedTables) {
            await updatedWaiter.updateOne({ assignedTables: req.body.assignedTables });
        }
        if (req.body.notifications) {
            console.log(req.body.notifications);
            await updatedWaiter.updateOne({ notifications: req.body.notifications });
        }
        res.json(updatedWaiter);
    } catch (err) {
        return next(err);
    }
})


///DESTROY
router.delete("/:id", async (req, res, next) => {
    try {
        deletedWaiter = await Waiter.findByIdAndDelete(req.params.id).exec();
        res.json(deletedWaiter);
    } catch (err) {
        return next(err);
    }
})

module.exports = router