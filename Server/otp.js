const otpGenerator = require('otp-generator')

console.log(otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false }))