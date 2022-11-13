const { Router } = require('express');
const UserComponent = require('index');


const router = Router();

router.get('/', UserComponent.findAll);

router.post('/', UserComponent.create);

router.get('/:id', UserComponent.findById);

router.update('/:id', UserComponent.update);

router.delete('/:id', UserComponent.deleteById);

module.exports = router;