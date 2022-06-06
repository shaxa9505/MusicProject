const {Router} = require("express");
const routes = Router();
const bcrypt = require("bcryptjs")
const Register = require("../model/Register")

routes.get("/register", (req ,res) => {
    res.render("register", {title: "Ro'yhatdan utish sahifasi", isReg: true})
})

routes.post("/register", (req, res) => {
    req.checkBody("name", "Iltimos ismingizni yozing").notEmpty();
    req.checkBody("username", "Iltimos username ingizni yozing").notEmpty();
    req.checkBody("email", "Iltimos emailingizni yozing").notEmpty();
    req.checkBody("password", "Iltimos parolingizni yozing").notEmpty();
    req.checkBody("password2", "Iltimos parolingizni tasdiqlang").equals(req.body.password)

    const errors = req.validationErrors();

    if(errors) {
        res.render("register", {title: "Ro'yhatdan o'tishda xatolik bor", errors: errors})
    }

    else {

        const {name, username, email, password} = req.body

        bcrypt.hash(password, 10, (err, hash) => {
            const newRegister = new Register({
                name,
                username,
                email,
                password: hash
            })

            newRegister.save((err) => {
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