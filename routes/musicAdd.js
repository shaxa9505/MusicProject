const {Router} = require("express");
const routes = Router();
const MusicSchema = require("../model/Music")

routes.get("/music/add", (req, res) => {
    res.render("musicAdd", {title: "Musiqa qushish", isMusic: true})
})


routes.post("/music/add", (req, res) => {
    const name = req.body.name;
    const singer = req.body.singer;
    const comments = req.body.comments;
    const music = new MusicSchema({name: name, singer: singer, comments: comments});

    music.save((err) => {
        if(err) console.log(err);
        else{
            res.redirect("/")
        }
    })

})



module.exports = routes


