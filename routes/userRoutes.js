const express = require('express');
const user = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const checkPermission = require('../middleware/permissionMiddleware');

const router = express.Router();

router.get('/user', protect, checkPermission(), user.getUsers);
router.get('/user/:id', protect , checkPermission(), user.getUserById);
router.put('/user/:id', protect, checkPermission() , user.update);
router.post('/user', protect, checkPermission(), user.createUser);
router.delete('/user/:id', protect, checkPermission(), user.delete);

module.exports = router;