console.log(`\nstart node.js`);
require('dotenv').config();
const fs = require('fs');
const Axios = require('axios');
const axios = Axios.create({baseURL: 'https://jsonplaceholder.typicode.com'});
const path = __dirname + '/files';

/**
 * 1. call https://jsonplaceholder.typicode.com/users and write it to file users.json
 */


async function makeDirectory() {
    fs.stat(path, async function (error) {
        if (error && error.code === 'ENOENT') {
            try {
                await fs.promises.mkdir(path);
                console.info('Directory ' + path + ' created successfully');
            } catch (error) {
               // console.error('Error when create directory ' + path + '\n', error);
            }
        }
    });
}


async function writeUsersFile() {
    await makeDirectory();

    try {
        await axios({
            method: 'get',
            url: '/users',
        }).then(function (response) {
            if (response && response.status === 200 && response.data) {
                try {
                    const fileName = path + '/users.json';
                    fs.promises.writeFile(fileName, JSON.stringify(response.data));
                    console.info('File ' + fileName + ' wrote successfully');
                } catch (error) {
                    console.error('Error when write file\n', error);
                }
            }
        });

    } catch (error) {
        console.error('Error when get users\n', error);
    }
}

writeUsersFile().then();


/**
 * 2. Let's work with running node script with some environment variables
 * todo: Pass parameter ENV when you run this script.
 * If param is PRODUCTION  get data from https://jsonplaceholder.typicode.com/todos and write it to file todos.json
 * If param is DEV get data from https://jsonplaceholder.typicode.com/albums and write if to file albums.json
 */


async function writeDataFile() {
    await makeDirectory();
    // console.log(process.env.NODE_ENV);

    if (process.env.NODE_ENV !== 'DEV' && process.env.NODE_ENV !== 'PRODUCTION') {
        return false;
    }

    const url = process.env.NODE_ENV === 'PRODUCTION' ? '/todos' : '/albums';
    const fileName = process.env.NODE_ENV === 'PRODUCTION' ? 'todos.json' : 'albums.json';

    try {
        await axios({
            method: 'get',
            url: url,
        }).then(function (response) {
            if (response && response.status === 200 && response.data) {
                try {
                    fs.promises.writeFile(path + '/' + fileName, JSON.stringify(response.data));
                    console.info('File ' + fileName + ' wrote successfully');
                } catch (error) {
                    console.error('Error when write file\n', error);
                }
            }
        });

    } catch (error) {
        console.error('Error when get data\n', error);
    }
}

writeDataFile().then();
