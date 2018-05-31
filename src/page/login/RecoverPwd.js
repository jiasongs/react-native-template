//import liraries
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { Button } from 'teaset';
import NavigationBar from '../../component/NavigationBar'
// create a component
class RecoverPwd extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = { isNext: false }
    }

    _onPressVerification = () => {
        alert('获取验证码')
    }
    _onPressNext = () => {
        if (!this.state.isNext) {
            alert('验证码验证成功后，更改state')
            this.setState({ isNext: true })
        } else {
            alert('确认修改成功')
        }
    }
    _onChangePhone = (text) => {
        // 输入用户名
    }
    _onChangeOne = (text) => {
        // 再次输入密码
    }
    _onChangeTwo = (text) => {
        // 再次输入密码

    }
    render() {
        return (
            <View style={styles.container} >
                <NavigationBar
                    title={'找回密码'}
                    rightViewOnPress={this.rightOnPress}
                />
                <View style={styles.loginContainer}>
                    {this.state.isNext ? <TextInput
                        style={styles.input}
                        underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                        placeholder={'请输入密码'}
                        returnKeyType={'done'}
                        secureTextEntry={true}
                        onChangeText={this._onChangeOne}
                    /> : <TextInput
                            style={styles.input}
                            underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                            placeholder={'请输入手机号'}
                            returnKeyType={'done'}
                            keyboardType={'numeric'}
                            onChangeText={this._onChangePhone}
                        />}
                    {this.state.isNext ? (
                        <TextInput
                            style={styles.input}
                            underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                            placeholder={'再次输入新密码'}
                            returnKeyType={'done'}
                            secureTextEntry={true}
                            onChangeText={this._onChangeTwo}
                        />
                    ) : (
                            <View style={styles.verificationContainer}>
                                <TextInput
                                    style={styles.verificationInput}
                                    underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                    placeholder={'请输入验证码'}
                                    returnKeyType={'done'}
                                    keyboardType={'numeric'}
                                />
                                <TouchableOpacity onPress={this._onPressVerification}>
                                    <Text style={styles.verification} >
                                        {'丨获取验证码'}
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        )}
                    <Button
                        onPress={this._onPressNext}
                        style={styles.loginButton}
                        titleStyle={styles.loginButtonTitle}
                        title={this.state.isNext ? '确认' : '下一步'} />
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
    },
    loginContainer: {
        marginTop: ScaleSize(20),
        marginHorizontal: ScaleSize(68),
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
    },
    loginButton: {
        marginHorizontal: ScaleSize(0),
        height: ScaleSize(90),
        backgroundColor: '#1BB77A',
        borderWidth: 0,
        marginTop: ScaleSize(70),
    },
    loginButtonTitle: {
        color: '#FFFFFF',
        fontSize: FontSize(18),
    },
});

//make this component available to the app
export default RecoverPwd;
