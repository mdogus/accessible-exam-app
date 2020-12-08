const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    surname: String,
    email: { type: String },
    password: { type: String },
    age: { type: String },
    gender: { type: String },
    studentVar1: { type: String },
    studentVar2: { type: String },
    job: { type: String },
    personalTechs: [{ type: String }],
    assistiveTechs: { type: String },
    opSystem: [{ type: String }]
});

/*User.updateMany({},
    {age: ''},
    {multi: true},
    function(err, numberAffected){});*/

module.exports = mongoose.model("User", User, "user");
