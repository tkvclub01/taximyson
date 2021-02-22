const templateLib = require('./template');
const {NganLuong} = require('vn-payments');
const {promisify} = require('util');
const getIP = promisify(require('external-ip')());
const nganLuong = new NganLuong({
    paymentGateway: 'https://www.nganluong.vn/checkout.php',
    merchant: '64605',
    receiverEmail: 'thanhtanico@gmail.com',
    secureSecret: 'ced02ace3f4318a982fb359d5ac650c3'
});
module.exports.render_checkout = function (request, response) {
    var full_url = request.protocol + "://" + request.get('host');
    var success_url = full_url + "/nganluong-process";
    var cancel_url = full_url + "/cancel";
    var amount = request.body.amount;

    var order_id = request.body.order_id;
    var customerId = request.body.cust_id;
    var email = request.body.email;
    var phone = request.body.mobile_no;

    // construct checkout payload from form data and app's defaults
    const checkoutData = {
        amount: parseInt(amount, 10),
        clientIp: getIP(),
        currency: 'VND',
        locale: 'vn',
        orderId: order_id,
        customerId: customerId,
        returnUrl: success_url,
        transactionId: orderId,
        vpcCommand: 'pay',
        customerEmail: email,
        customerPhone: phone,
        cancelUrl: cancel_url

    }
    nganLuong.buildCheckoutUrl(checkoutData)
        // eslint-disable-next-line promise/always-return
        .then(checkoutUrl => {
            response.send(templateLib.getTemplate(
                checkoutUrl.href
            ));
        })
        .catch(err => {
            console.log(err);
            response.redirect('/cancel');
        });
};

module.exports.process_checkout = function (req, res) {
    const query = req.query;

    // eslint-disable-next-line promise/catch-or-return
    nganLuong.verifyReturnUrl(query).then(results => {
        // eslint-disable-next-line promise/always-return
        if (results.isSucceed) {
            res.redirect(`/success?amount=${results.price}&transaction_id=${results.orderId}&order_id=${results.orderId}`);
        } else {
            res.redirect('/cancel');
        }
    });
};