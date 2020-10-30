const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Log = new Schema({
timestamp: Date,
    level: String,
    message: String,
    meta: {}
});

module.exports = mongoose.model("Log", Log, "log");
