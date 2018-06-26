'use strict';
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { configRoute } from './addToRouteStack'
import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator'
import SplashScreen from 'react-native-splash-screen'
import TabNavigation from './TabNavigation'
import Home from '../page/Home'
import Mine from '../page/Mine'
import Setting from '../page/Setting'
import LoginAndRegistered from '../page/login/LoginAndRegistered'
import RecoverPwd from '../page/login/RecoverPwd'
import VideoPage from '../page/VideoPage';
import Chat from '../page/Chat';
import LivePage from '../page/LivePage';

const Nav = createStackNavigator(configRoute({
    Tab: { screen: TabNavigation },
    Mine: { screen: Mine },
    Setting: { screen: Setting },
    LoginAndRegistered: { screen: LoginAndRegistered },
    RecoverPwd: { screen: RecoverPwd },
    VideoPage: { screen: VideoPage },
    Chat: { screen: Chat },
    LivePage: { screen: LivePage },
}), {
        initialRouteName: 'LivePage',
        cardStyle: {
            shadowOpacity: 0,
            shadowRadius: 0,
            backgroundColor: Theme.pageBackgroundColor,
        },
        navigationOptions: {
            header: null,
            gesturesEnabled: true
        },
        transitionConfig: () => {
            return {
                screenInterpolator: (sceneProps) => {
                    return StackViewStyleInterpolator.forHorizontal(sceneProps)
                },
                // containerStyle: {
                //     backgroundColor: 'black',
                // }
            }
        }
    });


class Navigation extends React.PureComponent {

    componentDidMount() {
        SplashScreen.hide();
    }

    render() {
        return (
            <View style={styles.container}>
                <Nav />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.pageBackgroundColor,
    },
});


export default Navigation;
