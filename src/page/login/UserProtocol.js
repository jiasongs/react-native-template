//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, WebView } from 'react-native';
import NavigationBar from '../../components/NavigationBar';
// create a component
class UserProtocol extends React.PureComponent {

    con
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'用户服务协议'}
                    rightViewOnPress={this.rightOnPress}
                />
                <WebView
                    source={{ uri: '' }}
                />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});

//make this component available to the app
export default UserProtocol;
