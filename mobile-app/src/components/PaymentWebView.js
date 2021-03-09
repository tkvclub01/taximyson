import React from 'react';
import {WebView} from 'react-native-webview';
import {cloud_function_server_url} from 'config';

export default function PaymentWebView(props) {

    const onLoadStart = (syntheticEvent) => {
        const {nativeEvent} = syntheticEvent;
        let matchUrl = nativeEvent.url.split('?');
        if (matchUrl[0] === cloud_function_server_url + '/success') {
            var obj = {gateway: props.provider.name};
            if (matchUrl[1]) {
                var pairs = matchUrl[1].split('&');
                for (i in pairs) {
                    var split = pairs[i].split('=');
                    obj[decodeURIComponent(split[0])] = decodeURIComponent(split[1]);
                }
            }
            if (obj['transaction_id'] == undefined) {
                obj['transaction_id'] = 'no transaction id'
            }
            props.onSuccess(obj);
        }
        if (matchUrl[0] === cloud_function_server_url + '/cancel') {
            props.onCancel();
        }
    };
    let email = (props.payData.email) ? props.payData.email : '';


    var data = 'order_id=' + props.payData.order_id
    + '&amount=' + props.payData.amount
    + '&currency=' + props.payData.currency
    + '&product_name=' + props.payData.product_name
    + '&description=' + props.payData.description
    + '&quantity=' + props.payData.quantity
    + '&cust_id=' + props.payData.cust_id
    + '&mobile_no=' + props.payData.mobile_no
    + '&mobile=' + props.payData.mobile
    + '&email=' + email;

    return (
        <WebView
            originWhitelist={['*']}
            source={{
                uri: cloud_function_server_url + props.provider.link,
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: data
            }}
            onLoadStart={onLoadStart}
        />
    );
};
