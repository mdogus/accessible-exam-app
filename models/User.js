const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    surname: String,
    email: {
        type: String
        //required: true,
        //unique: true
    },
    password: {
        type: String
        //minlength: 8
    },
});

module.exports = mongoose.model("User", User, "user");
