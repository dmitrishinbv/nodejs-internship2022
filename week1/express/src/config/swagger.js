const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.1',
        servers: [{ url: 'http://localhost:3002/v1' }],
        info: {
            title: 'Onix Internship - Bohdan Dmitrishin',
            version: '1.0.0',
            description: 'REST API swagger documentation',
        },
        tags: [{
            name: 'Tasks',
            description: 'User tasks demo description',
        }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{
            bearerAuth: [],
        }],
    },
    apis: ['src/components/**/swagger.js'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = {
    init(app) {
        app.use('/swagger-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    },
};
