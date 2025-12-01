const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp } = require('../config/controller/authController');
const authMiddleware = require('./middleware/authMiddleware');


// endpoints
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: `Hello user ${req.user.phone}` });
});

module.exports = router;
