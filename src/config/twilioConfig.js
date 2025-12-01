require("dotenv").config();
const twilio = require("twilio");

if (!process.env.ACCOUNT_SID || !process.env.AUTH_TOKEN || !process.env.SERVICE_SID) {
  console.log(" Twilio env vars missing");
} else {
  console.log(" Twilio Config Loaded ✔");
}

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

module.exports = {
  client,
  service_SID: process.env.SERVICE_SID,
};
