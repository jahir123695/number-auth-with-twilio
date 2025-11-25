const express = require('express');
const { client, service_SID } = require('./twilioConfig');
const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());

function formatPhone(phone) {
    if (!phone) return null;

    let cleaned = phone.replace(/\s+/g, '').replace(/-/g, '');

    if (!cleaned.startsWith('+')) {
        cleaned = '+91' + cleaned;
    }

    return cleaned;
}


app.post('/send-otp', async (req, res) => {
    try {
        let { phone_no } = req.body;

        if (!phone_no) {
            return res.status(400).json({ message: 'Phone number is required' });
        }

        const formattedPhone = formatPhone(phone_no);

        const result = await client.verify.v2
            .services(service_SID)
            .verifications
            .create({
                to: formattedPhone,
                channel: 'sms'
            });

        res.json({
            message: 'OTP sent successfully',
            result
        });

    } catch (error) {
        res.status(500).json({
            message: 'Failed to send OTP',
            error: error.message
        });
    }
});


app.post('/verify-otp', async (req, res) => {
    try {
        let { phone_no, otp } = req.body;

        if (!phone_no || !otp) {
            return res.status(400).json({ message: 'Phone number and OTP are required' });
        }

        const formattedPhone = formatPhone(phone_no);

        const result = await client.verify.v2
            .services(service_SID)
            .verificationChecks
            .create({
                to: formattedPhone,
                code: otp
            });

        if (result.valid === true && result.status === "approved") {
            return res.json({
                message: "OTP verified successfully",
                result
            });
        } else {
            return res.status(400).json({
                message: "Invalid OTP",
                result
            });
        }

    } catch (error) {
        res.status(500).json({
            message: 'Failed to verify OTP',
            error: error.message
        });
    }
});


app.listen(port, () => console.log(`Server running on port ${port}`));
