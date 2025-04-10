// Your AccountSID and Auth Token from console.twilio.com
const accountSid = 'AC9790cce46f49ff0ec390ec76ab3fc218';
const authToken = 'bb797d1aeb750af1c782327a5894d991';

const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'Hello from twilio-node i am daniel',
    to: '+250 783 149 241', // Text your number
    from: '+1 947 221 4780', // From a valid Twilio number
  })
  .then((message) => console.log("Message was sent successfully", message.sid))
  .catch((error) => console.error("Failed to send message:", error)); // Handle any errors