const multer = require("multer");
const path = require("path");
const fileUploadPath = path.join(__dirname, "../public/profile");

const fileFilter = (req, file, cb) => {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    return cb(null, true);
  }

  cb(null, false);

  // To accept the file pass `true`, like so:

  // You can always pass an error if something goes wrong:
  cb(new Error("I don't have a clue!"));
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, fileUploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

module.exports = upload = multer({ storage: storage, fileFilter });
