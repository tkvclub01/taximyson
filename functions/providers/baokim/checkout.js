const templateLib = require('./template');
const api_key = "uCkJItwqJAO97voW4t2z6pQvUyJ6FATy";
const secret_key = 'V3zPo6iIsI2HXhFghh3lWM05lHTF2P1q';
const webhook_url = "http://php5.varnish.dev.baokim.vn/webhook-momo.php";
const checkout_url = "https://api.baokim.vn/payment/api/v4/order/send";
module.exports.render_checkout = function (request, response) {
    var order_id = request.body.order_id;
    var amount = request.body.amount;
    var full_url = request.protocol + "://" + request.get('host');
    var success_url = full_url + "/success";
    var cancel_url = full_url + "/cancel";


    var settings = {
        "async": true,
        "crossDomain": true,
        "url": checkout_url,
        "method": "POST",
        "data": {
            "mrc_order_id": order_id,
            "total_amount": amount,
            "description": request.body.desc,
            "url_success": "TGW2GarvDcLJDzb4",
            "merchant_id": 16,
            "url_detail": "gCjKKiv9lZ3s0cKs",
            "lang": "dY6CcBfsCvbf4zNf",
            "bpm_id": 7,
            "accept_bank": "RPYU3irRpp6zDYts",
            "accept_cc": "KQvPSuYhz53tg0CX",
            "accept_qrpay": "52PD4XvBKEQgOAZ2",
            "accept_e_wallet": "LLNBs3aG94sWKH80",
            "webhooks": "meibT82PmSS28Ors",
            "customer_email": "AKuLhFUjOFFFjmwj",
            "customer_phone": "9sYogUVq5betG4CW",
            "customer_name": "eqpnNAmNbrxyIx4m",
            "customer_address": "rufxROpjYPbPRjWv"
        },
        "headers": {
        }
    }

    response.send(templateLib.getTemplate(
        checkout_url,
        api_key,
        secret_key,
        order_id,
        amount,
        success_url,
        cancel_url,
        webhook_url
    ));
};