//import liraries
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView
} from 'react-native';
import { Button } from 'teaset';
import PropTypes from 'prop-types'
import SpinnerLoading from '../../component/SpinnerLoading'
import moduleName from 'jshare-react-native';
import { checkMobile, checkPassword } from '../../util/Tool';


class LRComponent extends React.PureComponent {
    static propTypes = {
        type: PropTypes.oneOf(['登陆', '注册'])
    }

    static defaultProps = {
        type: '登陆'
    }
    constructor(props) {
        super(props)
        this.verificationCode = ''
    }

    _onPressVerification = () => {

    }
    _onPressWeiXin = () => {
        alert('微信')

    }
    _onPressQQ = () => {
        alert('QQ')
    }
    _onPressForgetPwd = () => {

    }
    _onPress = () => {

    }
    _onPressProtocol = () => {

    }
    _onChangeLogin = (text) => {

    }
    _onChangePwd = (text) => {

    }
    _onChangeVerification = (text) => {

    }

    render() {
        const { type, loginStore } = this.props
        return (
            <View style={styles.container}>
                {/* <SpinnerLoading isVisible={loginStore.loading} /> */}
                <View style={styles.loginContainer}>
                    <TextInput
                        style={styles.input}
                        ref={v => this.input = v}
                        keyboardType={'numeric'}
                        underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                        placeholder={'请输入手机号'}
                        returnKeyType={'done'}
                        clearButtonMode='while-editing'
                        onChangeText={this._onChangeLogin}
                    />
                    {
                        type == '登陆' ? null : (
                            <View style={styles.verificationContainer}>
                                <TextInput
                                    style={styles.verificationInput}
                                    underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                    placeholder={'请输入验证码'}
                                    keyboardType={'numeric'}
                                    returnKeyType={'done'}
                                    onChangeText={this._onChangeVerification}
                                />
                                <TouchableOpacity onPress={this._onPressVerification}>
                                    <Text style={styles.verification}>
                                        {'丨获取验证码'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                        placeholder={'请输入密码'}
                        onChangeText={this._onChangePwd}
                        secureTextEntry={true}
                        returnKeyType={'done'}
                    />
                    {type == '登陆' ? (<Text style={styles.forgetPwd} onPress={this._onPressForgetPwd}>忘记密码?</Text>) : (
                        null
                    )}
                    <Button
                        onPress={this._onPress}
                        style={styles.loginButton}
                        titleStyle={styles.loginButtonTitle}
                        title={type == '登陆' ? '登 陆' : '注 册'} />
                </View>
                <View style={styles.fastContainer}>
                    <Text style={styles.fastMarkText}>
                        <Text style={styles.fastMarkTextLine}>{'————    '}</Text>
                        使用以下账号快速登陆
                <Text style={styles.fastMarkTextLine}>{'    ————'}</Text>
                    </Text>
                    <View style={styles.qqWeiXinContainer}>
                        <TouchableOpacity onPress={this._onPressWeiXin}>
                            <Image style={styles.weixin} source={Images.icon_weixin} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._onPressQQ}>
                            <Image style={styles.qq} source={Images.icon_qq} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.protocolContainer}>
                        <Image style={styles.protocolImage} source={Images.login_selected} />
                        <Text style={styles.protocolText}>
                            我同意
                    <Text style={styles.protocolText2} onPress={this._onPressProtocol}>
                                《亮彩英雄榜用户服务协议》
                    </Text>
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
    },
    input: {
        height: ScaleSize(90),
        fontSize: FontSize(14),
        paddingLeft: ScaleSize(10),
        padding: 0,
        // backgroundColor: 'red',
        color: '#333333',
        borderBottomWidth: 1,
        borderColor: '#ededed',
    },
    loginContainer: {
        marginTop: ScaleSize(70),
        marginHorizontal: ScaleSize(68),
    },
    forgetPwd: {
        fontSize: FontSize(12),
        color: '#1BB77A',
        alignSelf: 'flex-end',
        marginTop: ScaleSize(40),
    },
    loginButton: {
        marginHorizontal: ScaleSize(0),
        height: ScaleSize(90),
        backgroundColor: '#1BB77A',
        borderWidth: 0,
        marginTop: ScaleSize(100),
    },
    loginButtonTitle: {
        color: '#FFFFFF',
        fontSize: FontSize(18),
    },
    fastMarkText: {
        color: '#999999',
        fontSize: FontSize(12),
    },
    fastContainer: {
        alignItems: 'center',
        marginHorizontal: ScaleSize(68),
        marginBottom: ScaleSize(80),
    },
    qqWeiXinContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: ScaleSize(60),
    },
    weixin: {
        width: ScaleSize(80),
        height: ScaleSize(80),
        marginRight: ScaleSize(210),
    },
    qq: {
        width: ScaleSize(80),
        height: ScaleSize(80)
    },
    protocolContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: ScaleSize(60),
    },
    protocolImage: {
        width: ScaleSize(20),
        height: ScaleSize(20),
    },
    protocolText: {
        color: '#999999',
        fontSize: FontSize(12),
        marginLeft: ScaleSize(20),
    },
    protocolText2: {
        color: '#1BB77A',
        fontSize: FontSize(12),
        marginLeft: ScaleSize(15),
    },
    fastMarkTextLine: {
        color: '#ededed',
    },
    verificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#ededed',
    },
    verification: {
        color: '#1BB77A',
        fontSize: FontSize(14),
    },
    verificationInput: {
        flex: 1,
        height: ScaleSize(90),
        fontSize: FontSize(14),
        paddingLeft: ScaleSize(10),
        padding: 0,
        // backgroundColor: 'red',
        color: '#333333',
    }
});

//make this component available to the app
export default LRComponent;
