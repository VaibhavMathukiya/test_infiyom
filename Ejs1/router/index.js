const express = require("express");
const router = express.Router();

const UserRoute = require("./userRoute");

router.use("/", UserRoute);

module.exports = router;
