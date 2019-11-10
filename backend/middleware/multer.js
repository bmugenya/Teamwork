var multer  = require('multer');
var Datauri = require('datauri');
const path = require('path');

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');
const dUri = new Datauri();


const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

module.exports =  { multerUploads,dataUri }
