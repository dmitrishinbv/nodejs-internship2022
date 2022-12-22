const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/user';

const db = mongoose.createConnection(url, { useNewUrlParser: true });

db.on('connecting', () => {
    console.log('Database connecting');
});

db.on('connected', () => {
    console.log('Database connected');
});

db.once('open', () => {
    console.log(`Database open: ${url}`);
});

db.on('error', (err) => {
    console.error(`Connection error: ${err}`);
    mongoose.disconnect();
});

module.exports = db;
