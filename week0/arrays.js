const myArray = [1, 10, 3, 6, 'ArrayElement'];

function checkIsNumber() {
    // let result = true;
    //     // myArray.forEach((item) => {
    //     //     if (typeof item !== 'number') {
    //     //         result = false;
    //     //     }
    //     // });
    //     //
    //     // return result;

    //fix
    const isNumber = (value) => typeof value === 'number';
    return myArray.every(isNumber);
}



function checkIsBiggerThanFive() {
    // let result = false;
    // myArray.forEach((item) => {
    //     if (Number(item) > 5) {
    //         result = true;
    //     }
    // });

   // return result;

    //fix
    const isBiggerThanFive = (value) => Number(value) > 5;
    return myArray.some(isBiggerThanFive);
}

function getElementsBiggerThanFive() {
    return myArray.filter(item => Number(item) > 5);
}

function getMultiplied() {
    return myArray.filter(item => typeof item === 'number').map(item => item*2);
}

function getSortAsc() {
    return myArray.filter(item => typeof item === 'number').sort((a, b) => (a > b) ? 1 : -1)
}

function getSortDesc() {
    return myArray.filter(item => typeof item === 'number').sort((a, b) => (a < b) ? 1 : -1)
}

Array.prototype.isNumber = checkIsNumber;
Array.prototype.isBiggerThanFive = checkIsBiggerThanFive;
Array.prototype.elementsBiggerThanFive = getElementsBiggerThanFive;
Array.prototype.multiplied = getMultiplied;
Array.prototype.sortAsc = getSortAsc;
Array.prototype.sortDesc = getSortDesc;

console.log(`\nstart arrays.js`);

/**
 * 1. Log 3 and 6 elements from myArray to console
 * Please, use more than on solution
 */
console.log(`3: ${myArray[2]}`);
console.log(`6: ${myArray[3]}`);
console.log(`3: ${myArray.find(item => item === 3)}`);
console.log(`6: ${myArray.find(item => item === 6)}`);
console.log(`3: ${myArray.filter(item => item === 3)}`);
console.log(`6: ${myArray.filter(item => item === 6)}`);


/**
 *  2. Log type of each element
 */

// myArray.forEach((item) => {
//     console.log(typeof item);
// });

//fix
myArray.map((item) => {
    console.log(typeof item);
});

/**
 *  3. Check if all elements in array is Number
 *  Should return Boolean
 */

const isNumber = myArray.isNumber();

console.log({
    isNumber,
});


/**
 * 4. Check if at least one element is bigger than 5
 * Should return Boolean
 */
const isBiggerThanFive = myArray.isBiggerThanFive();

console.log({
    isBiggerThanFive,
});

/**
 * 5. Create another variable that will include only elements that bigger than 5
 * Should return another Array
 */

const elementsBiggerThanFive = myArray.elementsBiggerThanFive();

console.log({
    elementsBiggerThanFive,
});

/**
 * 6. Multiply numbers of Array by 2
 * Should return another Array
 */

const multiplied = myArray.multiplied();

console.log({
    multiplied,
});

/**
 * 7. Calculate array sum
 */

const sum = myArray.reduce((prev, curr) => (Number(prev) || 0) + (Number(curr) || 0));

console.log({
    sum,
});

/**
 * 8. Sort array in ascending and descending order
 */

const asc = myArray.sortAsc();
const desc = myArray.sortDesc();

console.log({
    asc,
    desc,
});
