const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({    //It takes two parameter
    destination: function (req, file, cb) {     //file name destination
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {    //Second is the file name Unique
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        console.log(uniquePrefix + "-" + file.originalname);
        cb(null, uniquePrefix + "-" + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
        cb(null, true); //To accept the file pass true
    } else {
        cb(null, false);    //Else false
    }
}
//uploading a file is not a synchronus

module.exports = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        filesize: 1024 * 1024 * 5
    }
});