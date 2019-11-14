const cloudinary = require('cloudinary');


const config =  cloudinary.config;
const uploader = cloudinary.uploader;

const cloudinaryConfig = (req, res, next) => {

    config({
        cloud_name:  process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
    });

    next();
};


module.exports = { cloudinaryConfig, uploader };
