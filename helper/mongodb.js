module.exports = () => {
    const mongoose = require('mongoose');
    mongoose.connect('mongodb+srv://movies:dnU8HBFAi0kSEEec@newcluster.duasx.mongodb.net/test');

    const db = mongoose.connection;
    db.on("open", () => {
        console.log("Mongodb ga onlayn ulandik super");
    })
    db.on("error", (err) => {
        console.log("Bizda qayerdadir hatolik bor", err);
    })
}