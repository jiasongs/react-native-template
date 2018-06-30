import XPay from 'react-native-puti-pay';

class PayManager {

    static pay(type, data) {
        if (type === 'weixin') {
            const wx = {
                partnerId: data.partnerid,
                prepayId: data.prepayid,
                packageValue: data.package,
                nonceStr: data.noncestr,
                timeStamp: data.timestamp,
                sign: data.sign,
            }
            XPay.wxPay(wx, (res) => {
                console.log('微信支付', res)
                if (res.errCode == 0) {
                    return Promise.resolve({ reslut: 'sucess', code: 0 }) // resule可以自定义
                } else {
                    return Promise.resolve({ reslut: 'fail', code: 1 }) // resule可以自定义
                }
            })
        } else {
            XPay.alipay(data, (res) => {
                console.log('支付宝支付', res)
                if (res.resultStatus === '6001') {
                    resolve({ reslut: 'fail', code: 1 }) // resule可以自定义
                } else {
                    const result = JSON.parse(res.result)
                    if (result.alipay_trade_app_pay_response.code == 10000) {
                        return Promise.resolve({ reslut: 'sucess', code: 0 }) // resule可以自定义
                    } else {
                        return Promise.resolve({ reslut: 'fail', code: 1 })
                    }
                }
            })
        }
    }
}

export default PayManager