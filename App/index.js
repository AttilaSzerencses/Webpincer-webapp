const express = require("express");
const path = require("path");
const { Pool } = require("pg");
const app = express();
const route = require('./routes/route');
const PORT  = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(route);


app.listen(PORT, () => {
  console.log("App listening at: http://localhost:8080/");
});