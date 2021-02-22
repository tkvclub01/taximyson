const templateLib = require('./template');
const VNPay = require('node-vnpay');
const assert = require('assert');
const extIP = require('external-ip')();


var merchantCode = 'OKF0MVOR';
var secretKey = 'BPGOKBBUDOHTLKEEMIAPVKSZMNNFDQRW';
var full_url = '';
module.exports.render_checkout = async function (request, response) {
    full_url = request.protocol + "://" + request.get('host');
    var process_checkout = full_url + "/vnpay-process";
    var amount = request.body.amount;
    var order_id = request.body.order_id;
    var order_info = request.body.product_name;
    let vnpay = new VNPay({
        secretKey: secretKey,
        returnUrl: process_checkout,
        merchantCode: merchantCode,
        hashAlgorithm: 'sha256'
    });
    let payURL = await vnpay.genPayURL({
        transactionRef: order_id,
        orderInfo: order_info,
        orderType: 'topup',
        amount: parseInt(amount, 10)
    });
    console.log('payURL', payURL);
    /*

        let refundURL = await vnpay.genRefundURL({
            transactionType: '02',
            transactionRef: 'PT20200520103101_008',
            transDate: 20200520114301,
            orderInfo: 'Tra lai tien KH (kh tra lai hang)',
            amount: 100000
        })
        console.log('refundURL', refundURL);

        let queryURL = await vnpay.genQueryURL({
            transactionRef: 'PT20200520103101_007',
            orderType: '250006',
            transDate: 20200520104301,
            orderInfo: 'Kiem tra ket qua giao dich',
        });
        console.log('queryURL', queryURL);

        let responseData = {
            vnp_Amount: 1000000,
            vnp_BankCode: 'NCB',
            vnp_BankTranNo: '20200521-162954',
            vnp_CardType: 'ATM',
            vnp_OrderInfo: 'Thanh toan don hang thoi gian: 2020-05-21 16:05:42',
            vnp_PayDate: 20200521162945,
            vnp_ResponseCode: '00',
            vnp_TmnCode: '1SNJ89L8',
            vnp_TransactionNo: '13304053',
            vnp_TransactionStatus: '00',
            vnp_TxnRef: '160529',
            vnp_SecureHashType: 'SHA256',
            vnp_SecureHash: '8cd9d2efe8d67a39bdc1272540acfe712f610d5e154fa57dc83c6d0854d30c58'
        };
        console.log('is Valid response ', vnpay.checkVNPayResponse(responseData))
        console.log('Message: ' + vnpay.convertResponseMessage(responseData.vnp_ResponseCode))

    */

    response.send(templateLib.getTemplate(
        payURL
    ));
};

module.exports.process_checkout = async function (request, response) {
    var process_checkout = full_url + "/vnpay-process";

    let vnpay = new VNPay({
        secretKey: secretKey,
        returnUrl: process_checkout,
        merchantCode: merchantCode,
        hashAlgorithm: 'sha256'
    });
    let responseData = request.query;
    // eslint-disable-next-line no-empty
    if (Object.keys(responseData).length === 0) {
        response.redirect('/cancel');
    }
    if (responseData.vnp_ResponseCode !== '00') {
        response.redirect('/cancel');
    }

    console.log('response ', responseData);

    if (vnpay.checkVNPayResponse(responseData)) {
        response.redirect(`/success?amount=${request.query.vnp_Amount}&transaction_id=${request.query.vnp_TransactionNo}&order_id=${request.query.vnp_TxnRef}`);
    } else {
        response.redirect('/cancel');
    }
};