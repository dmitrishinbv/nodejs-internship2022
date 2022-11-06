console.log(`\nstart objects.js`);

const invoice = {
    firstName: 'Node',
    lastName: 'Developer',
    createdAt: '2022-10-31T22:50:59.305Z',
    amount: 150,
    currency: 'USD'
};

function getObjectKeys() {
    return Object.keys(invoice)
}

function getObjectValues() {
    return Object.values(invoice)
}

function getObjectEntries() {
    return Object.entries(invoice)
}

invoice.keys = getObjectKeys();
invoice.values = getObjectValues();
invoice.entries = getObjectEntries();

/**
 * 1. Log firstName and lastName in dot notation and bracket notation
 */

console.log(`First name: `, invoice.firstName);
console.log(`Last name: `, invoice.lastName);
console.log(`First name: `, invoice['firstName']);
console.log(`Last name: `, invoice['lastName']);

/**
 * 2. Log Object Keys
 */

const keys = invoice.keys;

console.log({
    keys,
});

/**
 * 3. Log Object values
 */

const values = invoice.values;

console.log({
    values,
});

/**
 * 4. Log Object entries
 */

const entries = invoice.entries;

console.log({
    entries,
});

/**
 * 5. Create second variable invoce from original
 * Please, use more than one solution
 */

const copiedInvoice1 = Object.assign({}, invoice);

delete copiedInvoice1.keys;
delete copiedInvoice1.values;
delete copiedInvoice1.entries;

console.log({
    copiedInvoice1,
});

const copiedInvoice2 = {...invoice};
delete copiedInvoice2.keys;
delete copiedInvoice2.values;
delete copiedInvoice2.entries;

console.log({
    copiedInvoice2,
});

/**
 * 6. Modify copiedInvoice amount value
 * Important: original invoice amount shouldnt be modified
 */

copiedInvoice1.amount = 300;
copiedInvoice2.amount = 400;

console.log({
    invoice,
    copiedInvoice1,
    copiedInvoice2,
});

/**
 * 7. Loop through object and log key-values
 */
console.log('\nlog key-values solutions\n');

invoice.keys.forEach((key) => {
    console.log(`${key} - ${invoice[key]}`);
});

console.log('\n');

for (const key in copiedInvoice1) {
    if (copiedInvoice1.hasOwnProperty(key)) {
        console.log(`${key} - ${copiedInvoice1[key]}`);
    }
}