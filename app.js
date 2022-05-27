const express = require("express");
const app = express();
const path = require("path")

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug");


const indexRouter = require("./routes/index");

app.use("/", indexRouter)


app.listen(3000, () => {
    console.log("3000 portda serverimizni kutardik super !!!!");
})
