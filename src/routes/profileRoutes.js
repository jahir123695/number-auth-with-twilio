const express = require('express');
const router = express.Router();
const { saveProfile, updateProfile, getProfile } = require('../config/controller/profileController');
const authMiddleware = require('./middleware/authMiddleware');

// CREATE profile (only first time)
router.post('/save', authMiddleware, saveProfile);

// UPDATE profile
router.put('/update', authMiddleware, updateProfile);

// GET logged-in user profile
router.get('/me', authMiddleware, getProfile);

module.exports = router;
