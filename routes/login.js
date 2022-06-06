const {Router} = require("express");
const routes = Router();

routes.get("/login", (req ,res) => {
    res.render("login", {title: "Saytga kirish sahifasi", isLogin: true})
})


module.exports = routes