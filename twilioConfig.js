require('dotenv').config();
const twilio = require('twilio');

const account_SID = process.env.ACCOUNT_SID;
const auth_token = process.env.AUTH_TOKEN;
const service_SID = process.env.SERVICE_SID;

const client = twilio(account_SID, auth_token);

module.exports = { client, service_SID };

