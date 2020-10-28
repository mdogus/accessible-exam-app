//udemy'deki kod
const mongoose = require("mongoose");

module.exports = () => {
    const uri = "mongodb+srv://user_admin:mKWwIjvbpPU2q8VV@clustereso.qxzto.mongodb.net/eso?retryWrites=true&w=majority";
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on("open", () => {
        console.log("MongoDB connection succeeded");
    });
    mongoose.connection.on("error", (err) => {
        console.log("MongoDB connection error", err);
    });
};

 
/*
//MongoClient mongo atlastaki kod
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://user_admin:mKWwIjvbpPU2q8VV@clustereso.qxzto.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/
