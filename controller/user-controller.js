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
    const msg = "Personal Info saved successfully!\nAd: " + user.name + "\nSoyad: " + user.surname + "\nYaş: " + user.age + "\nCinsiyet: " + user.genderRadios + "\nMeslek: " + user.job + "\nKişisel Teknolojier: " + user.personalTech + "\nYardımcı Teknolojiler: " + user.assistiveTechs + "\nİşletim sistemi: " + user.opSystem;
    
    try {
        //Add new fields
        /*await User.updateMany({},
        [{$set: { "age": "" }}],
        { multi: true }, function (err, doc) {
            if (err) return err;
            console.log('The doc response from Mongo was ', doc);
        });*/
        await User.updateOne({ "email": user.email },
                             { "age": user.age }, function(err, doc) {
            if (err) {
                console.log(err);
                logger.logger.log("error", err);
                res.send(err);
            } else {
                console.log("Personal Info saved successfully!\nAd: " + user.name + "\nSoyad: " + user.surname + "\nYaş: " + user.age + "\nCinsiyet: " + user.genderRadios + "\nMeslek: " + user.job + "\nKişisel Teknolojier: " + user.personalTech + "\nYardımcı Teknolojiler: " + user.assistiveTechs + "\nİşletim sistemi: " + user.opSystem);
                //logger.logger.log("info", "Personal Info saved successfully: %s %s %s %s %s %s %s %s %s", user.name, user.surname, user.age, user.genderRadios, user.job, user.personalTech, user.assistiveTechs, user.opSystem);
                //logger.logger.log("info", "Personal Info saved successfully: %s %s %s", user.name, user.surname, user.age);
                
                logger.logger.log("info", msg)
                //req.flash("message", "Kişisel Bilgi Formu kaydedilmiştir. Teşekkür ederiz.");
                res.redirect("/");
            }
        });
    } catch {
        console.log("Failed to save personal info.");
        logger.logger.log("error", "Failed to save personal info.");
        res.redirect("/login");
    };
};
