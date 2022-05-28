const {Router} = require("express");
const routes = Router();
const Music = require("../model/Music");

routes.get("/", (req, res) => {
    Music.find({}, (err, data) => {
        if(err) console.log(err);
        else {
            res.render("index", {title: "Bosh sahifa", isIndex: true, data})
        }
    });
})





module.exports = routes


