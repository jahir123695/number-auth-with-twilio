const db = require('../db');
const { client, service_SID } = require('../twilioConfig');
const { createToken } = require('../../utils/jwt');

// -------------------- SEND OTP --------------------
exports.sendOtp = async (req, res) => {
  try {
    const { phone_no } = req.body;

    if (!phone_no) {
      return res.status(400).json({ success: false, message: 'phone_no is required' });
    }

    const result = await client.verify.v2
      .services(service_SID)
      .verifications
      .create({
        to: phone_no,
        channel: 'sms',
      });

    return res.json({
      success: true,
      message: 'OTP sent successfully',
      result
    });

  } catch (error) {
    console.error("sendOtp error:", error?.message || error);
    return res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};


// -------------------- VERIFY OTP --------------------
exports.verifyOtp = async (req, res) => {
  const { phone_no, otp } = req.body;

  if (!phone_no || !otp)
    return res.status(400).json({ success: false, message: 'phone_no and otp are required' });

  try {
    const verification = await client.verify.v2
      .services(service_SID)
      .verificationChecks
      .create({ to: phone_no, code: otp });

    if (!verification || verification.status !== 'approved') {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    const [rows] = await db.execute('SELECT id FROM users_auth WHERE phone = ?', [phone_no]);

    let userId;
    const token = createToken(phone_no);

    if (rows.length === 0) {
      const [insertResult] = await db.execute(
        'INSERT INTO users_auth (phone, token, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
        [phone_no, token]
      );
      userId = insertResult.insertId;
    } else {
      userId = rows[0].id;
      await db.execute(
        'UPDATE users_auth SET token = ?, updated_at = NOW() WHERE id = ?',
        [token, userId]
      );
    }

    return res.json({
      success: true,
      message: 'OTP Verified',
      token,
      user: { id: userId, phone: phone_no },
    });

  } catch (err) {
    console.error('verifyOtp error:', err?.message || err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
