const {Router} = require("express");
const routes = Router();
const Music = require("../model/Music")

routes.get("/music/:id", (req, res) => {
    Music.findById(req.params.id, (err, data) => {
        if(err) console.log(err);
        else {
            res.render("music", {music: data})
        }
    })
})

module.exports = routes