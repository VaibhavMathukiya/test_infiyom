const express = require("express");
const router = express.Router();
const auth = require("../middelware/auth");
const passport = require("passport");
const upload = require("../config/multer");
// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/profile");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now() + ".jpg");
//   },
// });

// const upload = multer({ storage: storage });

const usersController = require("../Controllers/Usercontroller");
const Validators = require("../utils/validateRequest");

const {
  checkisNotAthenticated,
  checkisAthenticated,
} = require("../middelware/auth");

router.get("/login", checkisNotAthenticated, usersController.userslogin);
router.post(
  "/login",
  checkisNotAthenticated,
  Validators("loginUser"),
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  usersController.login
);

router.get("/register", checkisNotAthenticated, usersController.Registection);
router.post(
  "/register",
  checkisNotAthenticated,
  upload.single("file"),
  Validators("Register"),
  usersController.registection
);

router.get("/index", checkisAthenticated, usersController.index);
router.get("/viewUser", checkisAthenticated, usersController.ViewUsers);

// router.get("/getPagintion", checkisAthenticated, usersController.getPagintion);

router.get("/delete/:id", checkisAthenticated, usersController.Deleteuser);
router.get("/update/:id", checkisAthenticated, usersController.Update);
router.post("/EditUser", checkisAthenticated, usersController.Edituser);

router.get("/logout", checkisAthenticated, usersController.LogOut);

module.exports = router;
