const { Router } = require("express");
const routes = Router();
const MusicSchema = require("../model/Music")

routes.get("/music/add", (req, res) => {
    res.render("musicAdd", { title: "Musiqa qushish", isMusic: true })
})


routes.post("/music/add", (req, res) => {


    // bu yani checkbody 1-inputimizni kalitini qabul qiladi
    req.checkBody("name", "Iltimos musiqa nomini yozing").notEmpty();
    req.checkBody("singer", "Iltimos musiqa avtorini yozing").notEmpty();
    req.checkBody("comments", "Iltimos musiqaga izoh yozing").notEmpty();


    // bu uwa tipadegi checkbodylar wuni iciga kiladi
    const errors = req.validationErrors()


    if (errors) {
        res.render("musicAdd", {
            title: "Musiqa qushishda xatolik bor",
            errors: errors
        })
    }
    else {
        const name = req.body.name;
        const singer = req.body.singer;
        const comments = req.body.comments;

        const music = new MusicSchema({
            name,
            singer,
            comments
        });
        music.save((err) => {
            if (err) console.log(err);
            else {
                req.flash("success", "Musiqa muvaffaqiyatli quwildi !!!!")
                res.redirect("/")
            }
        })
    }



})



module.exports = routes


