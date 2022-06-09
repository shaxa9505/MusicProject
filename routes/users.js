const {Router} = require("express");
const routes = Router();
const bcrypt = require("bcryptjs")
const User = require("../model/User")

routes.get("/user", (req ,res) => {
    res.render("user", {title: "Ro'yhatdan utish"})
})

routes.post("/user", (req, res) => {
    req.checkBody("name", "Iltimos ismingizni yozing").notEmpty();
    req.checkBody("username", "Iltimos username ingizni yozing").notEmpty();
    req.checkBody("email", "Iltimos emailingizni yozing").notEmpty();
    req.checkBody("password", "Iltimos parolingizni yozing").notEmpty();
    req.checkBody("password2", "Iltimos parolingizni tasdiqlang").equals(req.body.password)

    const errors = req.validationErrors();

    if(errors) {
        res.render("user", {title: "Ro'yhatdan o'tishda xatolik bor", errors: errors})
    }

    else {

        const {name, username, email, password} = req.body

        bcrypt.hash(password, 10, (err, hash) => {
            const newUser = new User({
                name,
                username,
                email,
                password: hash
            })

            newUser.save((err) => {
                if(err) console.log(err);
                else {
                    req.flash("success", "Ma'lumotlaringiz muvaffaqiyatli qabul qilindi")
                    res.redirect("/login")
                }
            });
        })
        
        


    }

})

module.exports = routes;