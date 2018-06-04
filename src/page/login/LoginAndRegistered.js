//import liraries
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import NavigationBar from '../../component/NavigationBar'
import Container from '../../component/Container';
import SegmentedView from '../../component/SegmentedView'
import LRComponent from './LRComponent'
// create a component
class LoginAndRegistered extends React.PureComponent {

    render() {
        return (
            <Container style={styles.container}>
                <NavigationBar
                    title={'登陆/注册'}
                    leftView={null}
                    rightViewOnPress={this.rightOnPress}
                />
                <SegmentedView
                    style={styles.segmentedView}
                    barStyle={styles.segmentedBar}
                    indicatorLineColor={"#247E25"}
                    indicatorPositionPadding={ScaleSize(0)}
                    scrollEnabled={false}
                    lazy={false}
                    keyboardShouldPersistTaps={'always'}
                >
                    <View title={'密码登陆'}
                        activeTitleStyle={styles.sheetActiveTitle}
                        titleStyle={styles.sheetTitle}
                        style={{ backgroundColor: 'red', flex: 1 }}>
                        <LRComponent type={'登陆'} />
                    </View>
                    <View title={'快速注册'} activeTitleStyle={styles.sheetActiveTitle}
                        titleStyle={styles.sheetTitle}
                        style={{ backgroundColor: 'blue', flex: 1 }} >
                        <LRComponent type={'注册'} />
                    </View>
                </SegmentedView>
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    sheetActiveTitle: {
        color: '#247E25',
        fontSize: FontSize(14),
    },
    sheetTitle: {
        color: '#333333',
        fontSize: FontSize(14),
    },
    segmentedView: {
        marginTop: ScaleSize(48),
    },
    segmentedBar: {
        marginHorizontal: ScaleSize(80),
        height: ScaleSize(80)
    }
});

//make this component available to the app
export default LoginAndRegistered;
