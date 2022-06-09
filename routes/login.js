const { Router } = require("express");
const routes = Router();
const passport = require("passport");


routes.get("/login", (req, res) => {
    res.render("login", { title: "Tizimga kirish", isLogin: true })
})


routes.post("/login", (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
    })(req, res, next)
})


// routes.post('/login',
//     passport.authenticate('local', { 
//         failureRedirect: '/login' ,
//         failureFlash: true,
//     }),
//     function (req, res) {
//         res.redirect('/');
// });


routes.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err)}
        res.redirect('/login');
    });
})

module.exports = routes