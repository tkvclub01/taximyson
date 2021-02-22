function getTemplate(checkout_url) {
    return `
        <html>
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Thanh Toán với Onepay</title>
        </head>
        <body>
            <center>
                <h1>Vui lòng đợi đến khi thanh toán thành công...${checkout_url}</h1>
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