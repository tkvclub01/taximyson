const templateLib = require('./template');
const {OnePayDomestic} = require('vn-payments');
const {promisify} = require('util');
const getIP = promisify(require('external-ip')());

const onepayDom = new OnePayDomestic({
    paymentGateway: 'https://mtf.onepay.vn/vpcpay/vpcpay.op',
    merchant: 'TESTONEPAY',
    accessCode: '6BEB2546',
    secureSecret: '6D0870CDE5F24F34F3915FB0045120DB',
});

module.exports.render_checkout = function (req, res) {
    var full_url = req.protocol + "://" + req.get('host');
    var process_checkout = full_url + "/onepay-process";
    var amount = req.body.amount;
    var order_id = req.body.order_id;
    var customerId = req.body.email;


    // construct checkout payload from form data and app's defaults
    const checkoutData = {
        amount: parseInt(amount, 10),
        clientIp: getIP(),
        currency: 'VND',
        locale: 'vn',
        orderId: order_id,
        customerId: customerId,
        returnUrl: process_checkout,
        transactionId: order_id,
        vpcCommand: 'pay'
    }
    onepayDom.buildCheckoutUrl(checkoutData)
        // eslint-disable-next-line promise/always-return
        .then(checkoutUrl => {
            res.send(templateLib.getTemplate(
                checkoutUrl.href
            ));
        })
        .catch(err => {
            console.log(err);
            res.redirect('/cancel');
        });
};

module.exports.process_checkout = function (req, res) {
    const query = req.query;

    // eslint-disable-next-line promise/catch-or-return
    onepayDom.verifyReturnUrl(query).then(results => {
        // eslint-disable-next-line promise/always-return
        if (results.isSucceed) {
            res.redirect(`/success?amount=${results.price}&transaction_id=${results.orderId}&order_id=${results.orderId}`);
        } else {
            res.redirect('/cancel');
        }
    });
};