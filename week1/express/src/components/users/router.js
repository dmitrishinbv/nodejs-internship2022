const { Router } = require('express');
const UserComponent = require('./index');
const schemas = require('./schemas');
const middleware = require('../../config/middlewareValidation');
const auth = require('../../config/auth');

const router = Router();

router.post('/sign-in', UserComponent.userSign);

router.get('/', auth, middleware(schemas.findAllParams, true), UserComponent.findAll);

router.get('/:id?', auth, UserComponent.findById);

router.post('/', middleware(schemas.userPOST), UserComponent.create);

router.patch('/:id?', auth, middleware(schemas.userParams, true), middleware(schemas.userPATCH), UserComponent.update);

router.delete('/:id', auth, UserComponent.deleteById);

module.exports = router;
