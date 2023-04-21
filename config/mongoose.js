const mongoose = require('mongoose');
const env = require('./environment');

//Set up default mongoose connection
// const mongoDB = `mongodb://127.0.0.1/${env.db}`;
const mongoDB = process.env.MONGOURI;

mongoose.connect(mongoDB, { useNewUrlParser: true });
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//
db.once('open', function () {
    console.log('MongoDB :: connection open');
});

module.exports = db;
