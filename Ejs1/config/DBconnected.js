const mongoose = require("mongoose");
require("dotenv").config();
const DBurl = process.env.MongoDB_URL;

mongoose
  .connect(DBurl)
  .then(() => {
    console.log("DB connected Success..");
  })
  .catch((error) => {
    console.log(error);
  });
