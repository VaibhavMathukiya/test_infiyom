const express = require("express");
const app = express();
const path = require("path");
const PORT = 9000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
const viewPath = path.join(__dirname, "views");
app.set("view engine", "ejs");
app.set("views", viewPath);

const router = require("../Ejs/router/ScriptEjs");
app.use("/", router);


app.listen(PORT, () => {
  console.log("Server Runing On Port: " + PORT);
});
