const { Router } = require('express');
const UserComponent = require('./index');
const schemas = require('../../config/schemas');
const middleware = require('../../config/middlewareValidation');
const auth = require('../../config/auth');

const router = Router();

router.post('/sign-in', UserComponent.userSign);

router.get('/', auth, UserComponent.findAll);

router.get('/:id', auth, UserComponent.findById);

router.post('/', auth, middleware(schemas.userPOST), UserComponent.create);

router.patch('/:id?', auth, middleware(schemas.userPATCH), UserComponent.update);

router.delete('/:id', auth, UserComponent.deleteById);

module.exports = router;
