// In this file you can configure migrate-mongo

const config = {
    mongodb: {
        url: 'mongodb://127.0.0.1:27017',

        databaseName: 'user',

        options: {
            useNewUrlParser: true, // removes a deprecation warning when connecting
            useUnifiedTopology: true, // removes a deprecating warning when connecting
            //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
            //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
        },
    },

    migrationsDir: 'migrations',

    changelogCollectionName: 'changelog',

    migrationFileExtension: '.js',

    useFileHash: false,

    moduleSystem: 'commonjs',
};

module.exports = config;
