const multer = require('multer');
const db = require("../models");

//dictionaire des MIME type 
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg":"jpg",
    "image/gif": "gif",
    "image/png": "png",
}

// la destination de fich + generee un nome unique 

const storage = multer.diskStorage({


    destination: (req, file, cb) => {
        cb(null, 'upload');
    },

    filename: (req, file, cb) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        cb(null, name  + Date.now()+ "." + extension);
    }

})

module.exports = multer({ storage: storage }).single("profilePicture");