// routes/groupRoutes.js
const express = require('express');
const { createGroup, joinGroup } = require('../controllers/groupController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', protect, createGroup);
router.put('/join/:id', protect, joinGroup);

module.exports = router;
