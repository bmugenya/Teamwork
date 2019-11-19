const cloudinary = require('cloudinary');


const config =  cloudinary.config;
const uploader = cloudinary.uploader;

const cloudinaryConfig = (req, res, next) => {

    config({
        cloud_name:'doammcpie',
        api_key:312732988453856,
        api_secret:'lZAWnOC1uWeK_zvV4jehJRM_7BQ',
    });

    next();
};


module.exports = { cloudinaryConfig, uploader };

