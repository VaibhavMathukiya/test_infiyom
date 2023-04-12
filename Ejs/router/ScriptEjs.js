const express = require("express");
const router = express.Router();
const ejs = require("ejs");

router.get("/", (req, res) => {
  res.render("home");
});

const empSelary = [
  {
    name: "kamal",
    selary: 9000,
  },
  {
    name: "kapil",
    selary: 8000,
  },
  {
    name: "pankaj",
    selary: 9500,
  },
];

router.get("/emp/selary", (req, res) => {
  res.render("home.ejs", { empselary: empSelary });
});

const user = [
  {
    fristname: "vaibhav",
    lastname: "patel",
    phone: 9035268455,
    image: false,
    location: true,
    admin: true,
  },
];

router.get("/user/fName/lName", (req, res) => {
  res.render("home2.ejs", { user: user });
});

module.exports = router;
