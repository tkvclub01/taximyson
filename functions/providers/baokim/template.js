function getTemplate(
    checkout_url,
    api_key,
    secret_key,
    order_id,
    amount,
    success_url,
    cancel_url,
    webhook_url
) {
    return `
        <html>
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Thanh Toán với Bảo Kim</title>
        </head>
        <body>
            <center>
                <h1>Vui lòng đợi đến khi thanh toán thành công...</h1>
            </center>
                <div class="btn btn-success" id="check_out">
                    <form method="post" action="${checkout_url}" name="baokim">
                        <input type="hidden" name="api_key" value="${api_key}">
                        <input type="hidden" name="mrc_order_id" value="${order_id}">
                        <input type="hidden" name="total_amount" value="${amount}">
                        <input type="hidden" name="url_success" value="${success_url}">
                        <input type="hidden" name="url_detail" value="${cancel_url}">
                        <input type="hidden" name="payment_method_type" value="card">
                        <input type="hidden" name="webhook_url" value="${webhook_url}">
                    </form>
                </div>
            <script type="text/javascript">
                document.baokim.submit();
            </script>
            </form>
        </body>
        </html>
    `;
}

module.exports.getTemplate = getTemplate;