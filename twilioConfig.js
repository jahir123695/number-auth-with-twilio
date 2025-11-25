require('dotenv').config();
const twilio = require('twilio');

const account_SID = process.env.TWILIO_ACCOUNT_SID;
const auth_token = process.env.TWILIO_AUTH_TOKEN;
const service_SID = process.env.TWILIO_SERVICE_SID;

const client = twilio(account_SID, auth_token);

module.exports = { client, service_SID };

