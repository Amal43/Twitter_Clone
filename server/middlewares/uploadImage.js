const multer = require('multer');
const { createCustomError } = require('../errors/customError');
const express = require('express');
const route = express.Router();
const path = require('path');
route.use(express.static('./public/assets'));


let filestorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/assets');
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        const filename = `${Date.now()}${extension}`;
        cb(null, filename);
    }
})

const multerFilter = function (req, file, cb) {
    const acceptedMimetypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (acceptedMimetypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Not an accepted image format"), false);
    }
};

let upload = multer({
    storage:filestorage ,   
    fileFilter:multerFilter
})

module.exports = upload;