const functions = require('firebase-functions');
const vnpaycheckout = require('./checkout');

exports.link = functions.https.onRequest(vnpaycheckout.render_checkout);
exports.process = functions.https.onRequest(vnpaycheckout.process_checkout);