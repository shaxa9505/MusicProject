const express = require("express");
const app = express();
const path = require("path")
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

const mongodb = require("./helper/mongodb")();



// validatorlar settings
const flash = require("connect-flash");
const validator = require("express-validator");
const session = require("express-session");


// express-messages settings navigator express messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});


// express-session settings 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))


// express-validator 
app.use(validator({
    errorFormatter: (param, msg, value) => {
        let namespace = param.split(".")
        , root = namespace.shift()
        , formParam = root

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}))


const indexRouter = require("./routes/index");
const musicAddRouter = require("./routes/musicAdd");
const musicRouter = require("./routes/music");
const musicEditRouter = require("./routes/musicEdit")
const musicDeleteRouter = require("./routes/musicDelete")
const registerRouter = require("./routes/register")
const loginRouter = require("./routes/login")

app.use("/", indexRouter)
app.use("/", musicAddRouter)
app.use("/", musicRouter)
app.use("/", musicEditRouter)
app.use("/", musicDeleteRouter)
app.use("/", registerRouter)
app.use("/", loginRouter)



// PUG SETTINGS
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")))

app.listen(3000, () => {
    console.log("3000 portda serverimizni kutardik super !!!!");
})
