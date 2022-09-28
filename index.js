require("dotenv").config();
const port = process.env.PORT || 5000;
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require('cors')
const app = express();
const cookieParser = require('cookie-parser');

const { fileFilter, storage } = require("./helpers/img-upload/fileFilter");
const { ORIGIN } = require("./common/const/http");

try {
    mongoose
        .connect(process.env.CONNECTION_STRING)
        .then(() => console.log("CONNECTED TO DATABASE"))
        .catch((err) => console.log(err));

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        next();
    });
    app.use(cors({ origin: ORIGIN, credentials: true }));

    app.use(cookieParser());
    app.use(express.json({ extended: false, limit: '50mb' }))
    app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }))
    app.use(multer({ storage, fileFilter }).array("images"));

    app.use(require("./controllers/userController"));
    app.use(require("./controllers/favoriteController"));
    app.use(require("./controllers/authController"));
    app.use(require("./controllers/recipeController"));
    app.use(require("./controllers/conversationController"));

    app.listen(port, () => {
        console.log(`SERVER STATE IS ${process.env.NODE_ENV.toUpperCase()} MODE`)
        console.log(`SERVER IS RUNNING ON ${port}`);
    });
} catch (error) {
    console.log(error);

}