const { Router } = require('express');
const TaskComponent = require('./index');
const schemas = require('./schemas');
const middleware = require('../../config/middlewareValidation');
const auth = require('../../config/auth');

const router = Router();

router.get('/', auth, middleware(schemas.findAllParams, true), TaskComponent.findAll);

router.get('/:id', auth, TaskComponent.findById);

router.post('/', auth, middleware(schemas.taskPOST), TaskComponent.create);

router.patch('/:id', auth, middleware(schemas.taskID, true), middleware(schemas.taskPATCH), TaskComponent.update);

router.delete('/:id', auth, middleware(schemas.taskID, true), TaskComponent.deleteById);

module.exports = router;
