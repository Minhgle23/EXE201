const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const moment = require('moment');
const cors = require('cors');
const axios = require('axios');
const google = require('googleapis');

require('dotenv').config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

router.post('/create_payment_url', function (req, res, next) {

    process.env.TZ = 'Asia/Ho_Chi_Minh';

    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    let orderDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let config = require('config');

    let tmnCode = config.get('vnp_TmnCode');
    let secretKey = config.get('vnp_HashSecret');
    let vnpUrl = config.get('vnp_Url');
    let returnUrl = config.get('vnp_ReturnUrl');
    let orderId = moment(date).format('DDHHmmss');
    let amount = req.body.amount;
    let bankCode = req.body.bankCode;
    let locale = req.body.language;
    if (locale === null || locale === '') {
        locale = 'vn';
    }
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount*100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    const saveToDb = async () => {
        try {
            let customer = req.body.customer;
            let products = req.body.products;
            let order = {
                id: orderId,
                OrderDate: orderDate,
                Amount: amount,
                OrderInfo: vnp_Params['vnp_OrderInfo'],
                bankCode: bankCode,
                customer: customer,
                products: products,
                status: false
            };
            await axios.post('http://localhost:9999/detailOrders', order);
        } catch (error) {
            console.log(error);
        }
        res.json({
            redirectUrl: vnpUrl
        });
    }
    saveToDb();
});

router.get('/vnpay_return', async function (req, res, next) {
    let vnp_Params = req.query;
    let secureHash = vnp_Params['vnp_SecureHash'];
    let vnp_ResponseCode = vnp_Params['vnp_ResponseCode'];
    
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    let config = require('config');
    let tmnCode = config.get('vnp_TmnCode');
    let secretKey = config.get('vnp_HashSecret');

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
    
    if (secureHash === signed) {
        const orderId = vnp_Params['vnp_TxnRef'];
        
        try {
            const response = await axios.get(`http://localhost:9999/detailOrders/${orderId}`);
            const orderInfo = response.data;

            if (orderInfo) {
                if (vnp_ResponseCode === '00') {
                    // Update order status to true
                    await axios.patch(`http://localhost:9999/detailOrders/${orderId}`, { status: true });
                    res.redirect(`http://localhost:3000/success`);
                } else {
                    res.redirect('http://localhost:3000/fail');
                }
            } else {
                res.redirect('http://localhost:3000/fail');
            }
        } catch (error) {
            console.log(error);
            res.redirect('http://localhost:3000/fail');
        }
    } else {
        res.redirect('http://localhost:3000/fail');
    }
});

app.use('/api', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}