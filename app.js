const express = require("express");
const app = express();
const path = require("path")
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

const mongodb = require("./helper/mongodb")();

const indexRouter = require("./routes/index");
const musicAddRouter = require("./routes/musicAdd");
const musicRouter = require("./routes/music");
const musicEditRouter = require("./routes/musicEdit")

app.use("/", indexRouter)
app.use("/", musicAddRouter)
app.use("/", musicRouter)
app.use("/", musicEditRouter)


// PUG SETTINGS
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")))

app.listen(3000, () => {
    console.log("3000 portda serverimizni kutardik super !!!!");
})
