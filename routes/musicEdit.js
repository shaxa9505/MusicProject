const {Router} = require("express");
const Music = require("../model/Music");


const routes = Router();

routes.get("/music/edit/:id", (req, res) => {
    Music.findById(req.params.id, (err, data) => {
        if(err) console.log(err);
        else {
            res.render("musicEdit", {title: "Musiqani uzgartirish", music: data})
        }
    })
})

routes.post("/music/edit/:id", (req, res) => {
    const music = {};
    music.name = req.body.name;
    music.singer = req.body.singer;
    music.comments = req.body.comments;
    const query = {_id: req.params.id};

    Music.updateOne(query, music, (err) => {
        if(err) console.log(err);
        else{
            res.redirect("/")
        }
    })
})

module.exports = routes