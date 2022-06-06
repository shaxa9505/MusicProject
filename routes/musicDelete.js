const {Router} = require("express");
const routes = Router();
const Music = require("../model/Music");



routes.get("/music/delete/:id", (req, res) => {
    Music.findByIdAndDelete(req.params.id, (err) => {
        if(err) console.log(err);
        else{
            res.redirect("/")
        }
    })
})

module.exports = routes;