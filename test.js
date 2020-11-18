var CryptoJS = require("crypto-js");

const secretKey = 'Xdhf6whrhW'
var encrypted = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse('messag@asdasdsaasde'));

var decrypted = CryptoJS.enc.Base64.parse(encrypted).toString(CryptoJS.enc.Utf8);

console.log({encrypted}, {decrypted})
