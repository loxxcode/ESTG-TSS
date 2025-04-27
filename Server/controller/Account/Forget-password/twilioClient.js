const twilio = require('twilio');

const accountSid = "AC9790cce46f49ff0ec390ec76ab3fc218";
const authToken = "04cdc72536cfb0778b1fe1a5db1e0263";
const twilioPhoneNumber = "+1 947 221 4780";

module.exports = twilio(accountSid, authToken);