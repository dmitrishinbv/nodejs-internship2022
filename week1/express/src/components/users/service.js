require('./Users');

const users = global.usersData;

function findAll() {
    return users || [];
}

function findById(id) {
    return Number(id) && Number(id) > 0 ? users.filter((item) => item.id === Number(id)) : [];
}

async function update(id, props) {
    if (!id) {
        return { status: 404, message: 'Param \'id\' is required' };
    }

    try {
        const parseData = typeof props !== 'object' ? JSON.parse(props) : props;

        if (!parseData || JSON.stringify(parseData) === '{}') {
            return { status: 404, message: 'Empty request body is not a valid JSON document' };
        }

        const user = await findById(id);

        if (!user || !user.length) {
            return { status: 404, message: `User with id=${id} not found` };
        }

        const keys = Object.keys(parseData);

        // eslint-disable-next-line no-restricted-syntax
        for (const key of keys) {
            if (user[0][key] === undefined) {
                return { status: 404, message: `${key} is an invalid field name` };
            }
            user[0][key] = parseData[key];
        }

        return { status: 200, message: 'Success', data: user };
    } catch (error) {
        return { status: 500, message: `Error message ${error.message}` };
    }
}

async function deleteById(id) {
    const idNumber = Number(id);

    if (idNumber && idNumber > 0) {
        if (users.find((item) => item.id === id)) {
            const data = users.filter((item) => item.id !== id);

            console.log(`Users after delete user id=${id}\n ${JSON.stringify(data)}`);

            return { status: 200, message: `User  id=${id} was deleted`, data };
        }

        return { status: 200, message: `User  id=${id} not found`, data: users };
    }

    return { status: 404, message: `Param id=${id} is invalid` };
}

async function create(props) {
    try {
        const parseData = typeof props !== 'object' ? JSON.parse(props) : props;

        if (!parseData || !parseData.name || !parseData.email) {
            return { status: 404, message: 'Params \'name\' and \'email\' are required' };
        }

        const userList = await findAll();

        parseData.id = userList && userList.length ? userList[userList.length - 1].id + 1 : 1;
        users.push(parseData);

        return { status: 201, message: 'Created', data: users };
    } catch (error) {
        return { status: 500, message: `Error message ${error.message}` };
    }
    // console.log(`Users after create new user ${JSON.stringify(data)}`);
}

module.exports = {
    create,
    findAll,
    findById,
    update,
    deleteById,
};
