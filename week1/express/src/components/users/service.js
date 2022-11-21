require('./Users');

const users = global.usersData;

function findAll(options = null) {
    if (!options) {
        return users || [];
    }

    if (options.limit) {
        return users.slice(0, Number(options.limit));
    }

    return users;
}

function findById(id) {
    return users.filter((item) => item.id === id);
}

function findByUsername(username) {
    const user = users.filter((item) => item.username === username);

    return user.length ? user[0] : null;
}

function update(id, props) {
    const user = findById(id);

    if (!user.length) {
        return user;
    }

    // eslint-disable-next-line no-restricted-syntax
    // for (const key of Object.keys(props)) {
    //     if (key !== 'id' && user[0][key] !== undefined) {
    //         user[0][key] = props[key];
    //     }
    // }

    Object.keys(props).forEach((key) => {
        if (key !== 'id' && user[0][key] !== undefined) {
            user[0][key] = props[key];
        }
    });

    return user;
}

function deleteById(id) {
    return users.find((item) => item.id === id)
        ? users.filter((item) => item.id !== id)
        : [];
}

function create(props) {
    const params = props;
    const userList = findAll();

    params.id = userList && userList.length ? userList[userList.length - 1].id + 1 : 1;
    users.push(props);

    return users;
}

module.exports = {
    create,
    findAll,
    findById,
    findByUsername,
    update,
    deleteById,
};
