const mongoose = require('mongoose');

var mongoURL = "mongodb+srv://thujeevan:2728@cluster0.bj7ul.mongodb.net/mern-hotel";

mongoose.connect(mongoURL, {useUnifiedTopology : true, useNewUrlParser : true})

var connection = mongoose.connection;

connection.on('error', () => {
    console.log("MongoDB Connection Failed");
})

connection.on('connected', () => {
    console.log("MongoDB Connected Successfully");
})

module.exports = mongoose