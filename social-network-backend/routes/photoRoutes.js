// routes/photoRoutes.js
const express = require('express');
const { uploadPhoto } = require('../controllers/photoController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:groupId/upload', protect, uploadPhoto);

module.exports = router;
