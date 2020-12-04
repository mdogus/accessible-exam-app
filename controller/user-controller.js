//Models
const User = require("../models/User");
//logger_service
const Logger = require('../services/logger-service');
const logger = new Logger('login');
/**
 * Update a user with the specified id in the request
 */
exports.updateUser = async (req, res) => {
    const user = req.body;
    
    try {
        await User.update({},
        { "age": [] },
        { multi: true }, function (err, doc) {
            if (err) return err;
            console.log('The doc response from Mongo was ', doc);
        });
        await User.updateOne({ email: user.email },
        {$set: { age: user.age }},
        { multi:true }, function(err, doc) {
            if (err) {
                console.log(err);
                logger.logger.log("error", err);
                res.send(err);
            } else {
                console.log("Personal Info saved successfully:" + user.name + " " + user.surname + " " + user.age);
                logger.logger.log("info", "Personal Info saved successfully: %s %s %s", user.name, user.surname, user.age);
                res.redirect("/");
            }
        });
    } catch {
        console.log("Failed to save personal info.");
        logger.logger.log("error", "Failed to save personal info.");
        res.redirect("/login");
    };
};
