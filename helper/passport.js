const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/User");
const bcrypt = require("bcryptjs")

module.exports = (passport) => {
    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({ username: username }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {message: "Bunaqa foydalanuvchi topilmadi"});
                }

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) console.log(err);
                    if (isMatch) {
                        done(null, user, {message: "Xush kelibsiz"})
                    }
                    else {
                        done(null, false, { message: "Parolingiz noto'g'ri" })
                    }
                })

            });
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}