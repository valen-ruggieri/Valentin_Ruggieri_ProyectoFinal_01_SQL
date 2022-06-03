
const multer = require('multer')
const path = require('path');



const storageContent = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname + "/public/images"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const multerConfig = {
  storage: storageContent,
  dest: path.join(__dirname + "/public/images"),
  limits: { fileSize: 1000000 },
};
module.exports = multerConfig;