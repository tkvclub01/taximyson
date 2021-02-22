const functions = require('firebase-functions');
const baokimcheckout = require('./checkout');

exports.link = functions.https.onRequest(baokimcheckout.render_checkout);