const CryptoJS = require("crypto-js");

function decrypt(string) {
  var decrypted = CryptoJS.enc.Base64.parse(string).toString(CryptoJS.enc.Utf8);
  return decrypted.toString(CryptoJS.enc.Utf8)
}


function encrypt(string) {
  var encrypted = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(string));
  return encrypted.toString()
}

module.exports = {
  decrypt,
  encrypt
}
