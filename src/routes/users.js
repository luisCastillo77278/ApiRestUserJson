const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.get('/', userController.list);
router.get('/:id', userController.user);
router.post('/create', userController.store);
router.put('/update/:id', userController.edit);
router.delete('/delete/:id', userController.destroy);


module.exports = router;