const functions = require('firebase-functions');
const nganluongcheckout = require('./checkout');

exports.link = functions.https.onRequest(nganluongcheckout.render_checkout);
exports.process = functions.https.onRequest(nganluongcheckout.process_checkout);