'use strict';
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';

class ToolContainer extends React.PureComponent {



    render() {
        const { onPressRecharge, onPressGift } = this.props
        return (
            <KeyboardAvoidingView behavior={'padding'}>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <Image style={styles.textInputImage} />
                        <TextInput
                            style={styles.textInput}
                            placeholder={'说点什么呗~'}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                    <TouchableOpacity style={styles.rechargeTouch} onPress={onPressRecharge}>
                        <Image style={styles.rechargeImage} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.giftTouch} onPress={onPressGift}>
                        <Image style={styles.giftImage} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row',
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#cdcdcd',
        marginHorizontal: 10,
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginLeft: 5,
    },
    textInputImage: {
        width: 20,
        height: 20,
        backgroundColor: 'blue',
    },
    rechargeTouch: {
        marginRight: 10,
    },
    rechargeImage: {
        width: 40,
        height: 40,
        backgroundColor: 'blue',
    },
    giftTouch: {
        marginRight: 10,
    },
    giftImage: {
        width: 40,
        height: 40,
        backgroundColor: 'blue',
    },
});

export default ToolContainer