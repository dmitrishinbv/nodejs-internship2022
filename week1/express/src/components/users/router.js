const { Router } = require('express');
const UserComponent = require('./index');

const router = Router();

router.get('/', UserComponent.findAll);

router.get('/:id', UserComponent.findById);

router.post('/', UserComponent.create);

router.patch('/:id', UserComponent.update);

router.delete('/:id', UserComponent.deleteById);

module.exports = router;
