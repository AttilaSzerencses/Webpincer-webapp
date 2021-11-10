const express = require('express');
const route = require('./routes/route');
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");

const initializePassport = require("./config/passportConfig");
initializePassport(passport);

const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const { pool } = require("./config/dbConfig");
app.use(express.static( "public" ) );
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(route);
const PORT = process.env.PORT || 8080;


app.listen(PORT, () =>{
    console.log("App listening at: http://localhost:8080/");
});

