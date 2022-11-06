require('dotenv').config();

console.log(`\nstart functions.js`);

/**
 * 1. Write a funcion that accepts your firstName and lastName
 * Should return 'I'm firstName lastName'
 */


function sayWho() {
    if (process.argv.length === 2) {
        return '';
    }

    const args = process.argv.slice(2);

    return args.length === 1 ? 'I\'m ' + args[0] : 'I\'m ' + args[0] + ' ' + args[1];
}

console.log(sayWho());

/**
 * 2. Write a function that accepts numbers and return their sum
 * No limits for arguments count
 */

function countSum() {
    let sum = 0;
    const args = Array.from(arguments);

    args.forEach((item) => {
        if (Number(item)) {
            sum += item;
        }
    });

    return sum;
}
console.log('countSum');
console.log(countSum(4, 5, 23));
console.log(countSum(10, 50, 212, 300, 22));
console.log(countSum(1, 2));

/**
 * 3. Write a function that count number of letters in provided string
 */

function countLetters(string, letter) {
    return  [...string].filter(x => x === letter).length;
}
console.log('countLetters d');
console.log(countLetters('Node developer', 'd'));

/**
 *  4. Write function that will return random integer in range that you provided
 */

function getRandom(start, end) {
    return Math.floor(Math.random()*(end - start + 1) + start);
}

console.log('getRandom');
console.log(getRandom(0, 10));
console.log(getRandom(90, 200));
