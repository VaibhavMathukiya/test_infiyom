require("./config/DBconnected");
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 9000;
const path = require("path");
const router = require("./router");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const helmet = require('helmet')

app.use(helmet.hidePoweredBy());

// app.disabled("X-Powered-By");

require("./config/passport")(passport);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const viewPath = path.join(__dirname, "views");
app.set("view engine", "ejs");
app.set("views", viewPath);

app.use(express.static("public"));
app.use("/public", express.static("public"));

const store = MongoStore.create({
  mongoUrl: process.env.MongoDB_URL,
  maxAge: 1000 * 60 * 60 * 24 * 7,
  crypto: {
    secret: "squirrel",
  },
  stringify: true,
});

app.use(
  session({
    secret: process.env.Secret,
    saveUninitialized: true,
    resave: true,
    store: store,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());


app.use("/", router);

app.listen(PORT, () => {
  console.log("server runing on port: " + PORT);
});
