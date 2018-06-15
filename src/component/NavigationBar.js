'use strict';
import React, { PureComponent } from 'react'
import { Image, ImageBackground, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { NavigationBar } from 'teaset'

// create a component
class CusNavigationBar extends PureComponent {
    static propTypes = {
        ...NavigationBar.propTypes
    };

    static defaultProps = {
        ...NavigationBar.defaultProps
    };
    // }

    constructor(props) {
        super(props);
        this.state = {}
    }
    _rightViewOnPress = (p) => {
        this.props.rightViewOnPress && this.props.rightViewOnPress({ event: p, rightView: this.rightView })
    };

    // 新api
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     // console.log(prevState)
    //     return prevState
    _backOnPress = (p) => {
        if (this.props.backOnPress) {
            this.props.backOnPress({ event: p, backButton: this.leftView })
        } else {
            RouteHelper.goBack()
        }
    };
    render() {
        const { style, title, ...others } = this.props;
        return (
            <NavigationBar
                style={[styles.navBarStyle, style]}
                title={
                    <Text style={styles.navTitle}>{title}</Text>
                }
                background={
                    <ImageBackground
                        style={styles.navBackImage}
                        source={Images.nav_bar}
                    />
                }
                rightView={
                    <TouchableOpacity
                        ref={v => this.rightView = v}
                        style={styles.navRight}
                        onPress={this._rightViewOnPress}
                    >
                        <Image
                            source={Images.nav_right_button}
                        />
                    </TouchableOpacity>
                }
                leftView={
                    <TouchableOpacity
                        ref={v => this.rightView = v}
                        style={styles.navLeft}
                        onPress={this._backOnPress}
                    >
                        <Image
                            source={Images.icon_nav_left}
                            style={styles.leftImage}
                        />
                    </TouchableOpacity>
                }
                {...others}
            />
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    navBarStyle: {
        position: 'relative',
        backgroundColor: '#53812F'
    },
    navBackImage: {
        flex: 1,
    },
    navRight: {
        width: 30,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navTitle: {
        color: '#FFFFFF',
        fontSize: FontSize(15),
        // backgroundColor: 'red',
    },
    leftImage: {
        width: ScaleSize(55),
        height: ScaleSize(55),
    },
    navLeft: {

    }
});

//make this component available to the app
export default CusNavigationBar;
