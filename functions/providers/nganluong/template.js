function getTemplate(
    checkout_url
) {
    return `
        <html>
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Ngan Luong Payment Checkout</title>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>
            <script type="text/javascript" src="https://upload.nganluong.vn/public/css/newlanding/vendor/jquery/jquery.min.js"></script>
        </head>
        <body>
            <center>
                <h1>1 Please do not refresh this page...</h1>
            </center>
            <script type="text/javascript">
            window.open("${checkout_url}", "_self");
            </script>
            </form>
        </body>
        </html>
    `;
}

module.exports.getTemplate = getTemplate;