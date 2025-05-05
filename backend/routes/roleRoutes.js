const express = require('express');
const roleController = require('../controllers/roleController');
const protect = require('../middleware/authMiddleware');
const checkPermission = require('../middleware/permissionMiddleware');
const router = express.Router();

router.get('/roles', protect, checkPermission(), roleController.view);
router.get('/roles/:id', protect, checkPermission(), roleController.viewById);
router.post('/roles', protect, checkPermission(), roleController.create);
router.patch('/roles/:id', protect, checkPermission(), roleController.assignPersmission);
router.patch('/roles/:id/remove-permission', protect, checkPermission(), roleController.unAssignPersmission);
router.put('/roles/edit/:id', protect, checkPermission(), roleController.update);
router.delete('/roles/:id', protect, checkPermission(), roleController.delete);

module.exports = router;