const functions = require('firebase-functions');
const onepaycheckout = require('./checkout');

exports.link = functions.https.onRequest(onepaycheckout.render_checkout);
exports.process = functions.https.onRequest(onepaycheckout.process_checkout);