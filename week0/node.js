console.log(`\nstart node.js`);
require('dotenv').config();
const fs = require('fs');
const Axios = require('axios');
const axios = Axios.create({baseURL: 'https://jsonplaceholder.typicode.com'});

/**
 * 1. call https://jsonplaceholder.typicode.com/users and write it to file users.json
 * todo: install module to call this API, and use node FS module
 */

writeUsersFile().then();

async function writeUsersFile() {
    await axios({
        method: 'get',
        url: '/users',
    }).then(function (response) {
        //console.log(response)
        fs.writeFile(__dirname+'/files/users.json', JSON.stringify(response.data), function (err) {
            //console.error(err);
        });
    });
}


/**
 * 2. Let's work with running node script with some environment variables
 * todo: Pass parameter ENV when you run this script.
 * If param is PRODUCTION  get data from https://jsonplaceholder.typicode.com/todos and write it to file todos.json
 * If param is DEV get data from https://jsonplaceholder.typicode.com/albums and write if to file albums.json
 */

writeDataFile().then();

console.log(process.env.NODE_ENV)

async function writeDataFile() {
    if (process.env.NODE_ENV !== 'DEV' && process.env.NODE_ENV !== 'PRODUCTION') {
        return false;
    }

    const url = process.env.NODE_ENV === 'PRODUCTION' ? '/todos' : '/albums';
    const fileName = process.env.NODE_ENV === 'PRODUCTION' ? 'todos.json' : 'albums.json';

    await axios({
        method: 'get',
        url: url,
    }).then(function (response) {
        //console.log(response)
        fs.writeFile(__dirname+'/files/'+fileName, JSON.stringify(response.data), function (err) {
            //console.error(err);
        });
    });
}
