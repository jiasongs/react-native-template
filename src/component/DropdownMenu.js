'use strict';
//import liraries
import React, { PureComponent } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Easing } from 'react-native';
import PropTypes from 'prop-types'


// create a component
class DropDownMenu extends PureComponent {

    constructor(props) {
        super(props);
        this.state = { activeIndex: -1, visible: false }
    }

    static propTypes = {
        titleArray: PropTypes.array,
        renderContentComponent: PropTypes.func.isRequired,
        contentHeight: PropTypes.func.isRequired,

    };

    static defaultProps = {
        titleArray: ['全部分类', '周榜', '日期']
    };

    close = () => {
        this.setState({ visible: false })
    };

    changeBar = (activeIndex) => {
        if (activeIndex === -1) {
            this.close();
        } else {
            this.setState({ visible: true, activeIndex })
        }
    };

    _onClose = () => {
        this.close()
        this.props.onClose && this.props.onClose()
    };

    _captureRef = (v) => {
        this.contentContainer = v
    };

    _onPressBar = (activeIndex) => {
        this.changeBar(activeIndex)
    };

    render() {
        const { children, renderContentComponent, contentHeight, style, onClose, ...others } = this.props;
        console.log('render');
        return (
            <View style={[styles.container, style]}>
                <MenuBar
                    onPress={this._onPressBar}
                    visible={this.state.visible}
                    activeIndex={this.state.activeIndex}
                    {...others}
                />
                {children}
                <ContentContainer
                    ref={this._captureRef}
                    visible={this.state.visible}
                    onClose={this._onClose}
                    renderContentComponent={renderContentComponent(this.state.activeIndex)}
                    contentHeight={contentHeight(this.state.activeIndex)}
                    {...others}
                />
            </View>
        );
    }
}


class MenuBar extends PureComponent {

    constructor(props) {
        super(props);
        this.state = { activeIndex: -1 }
    }

    static propTypes = {
        onPress: PropTypes.func,
        titleArray: PropTypes.array,
        visible: PropTypes.bool
    };

    static defaultProps = {};

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     // console.log('getDerivedStateFromProps--->',nextProps, prevState);
    //     if (prevState.visible === nextProps.visible) {
    //         return {
    //             activeIndex: -1
    //         };
    //     }
    //     return null;
    // }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.visible) {
            this.setState({ activeIndex: -1 })
        } else {
            this.setState({ activeIndex: nextProps.activeIndex })
        }
    }

    _onPress = (index) => {
        let activeIndex = -1;
        if (index !== this.state.activeIndex) {
            activeIndex = index
        }
        this.setState({ activeIndex });
        this.props.onPress && this.props.onPress(activeIndex);
        console.log('zzz');
    };

    render() {
        const { titleArray, visible } = this.props;
        console.log('MenuBar');
        return (
            <View style={styles.barContainer}>
                {titleArray.map((item, index) => {
                    let color = this.state.activeIndex === index ? '#1c67ff' : '#2e2e2e'
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => this._onPress(index)}
                        >
                            <View style={styles.bar}>
                                <Text style={[styles.barTitle, { color }]}>{item}</Text>
                                <Animated.View style={[styles.arrowContainer, {
                                    transform: [{
                                        rotateZ: this.state.activeIndex === index ? '180deg' : '0deg'
                                    }]
                                }]}>
                                    <Image
                                        style={styles.rankingArrow}
                                        resizeMode={'contain'}
                                        source={Images.rankingArrow}
                                    />
                                </Animated.View>
                            </View>
                        </TouchableOpacity>
                    )
                })}

            </View>
        );
    }
}


class ContentContainer extends PureComponent {

    constructor(props) {
        super(props);
        this.state = { isVisible: props.visible };
        this.opacity = new Animated.Value(0);
        this.contentAnimatedHeight = new Animated.Value(0);
        this.preContentHeight = props.contentHeight;
    }

    static propTypes = {
        visible: PropTypes.bool.isRequired,
        renderContentComponent: PropTypes.element.isRequired,
        contentHeight: PropTypes.number.isRequired
    };

    static defaultProps = {
        visible: false
    };

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     console.log('getDerivedStateFromProps--->',nextProps, prevState);
    //     if (prevState.visible !== nextProps.visible) {
    //         return {
    //             isVisible: nextProps.visible,
    //             contentHeight: nextProps.contentHeight,
    //         };
    //     }
    //     return null;
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     console.log('componentDidUpdate-------->',prevProps, prevState, this.state);
    //     if (prevProps.visible !== this.state.isVisible) {
    //         this.startAnimated(this.state.isVisible);
    //     }
    //     if (this.state.isVisible) {
    //         this.startHeightAnimated(this.state.contentHeight);
    //     } else {
    //         this.startHeightAnimated(0);
    //     }
    // }

    componentWillReceiveProps(nextProps) {
        const { visible } = nextProps;
        const { isVisible } = this.state;
        if (visible !== isVisible) {
            this.startAnimated(visible)
        }
        if (visible) {
            // 开启状态
            this.startHeightAnimated(nextProps.contentHeight)
        } else {
            // 关闭状态
            this.startHeightAnimated(0)
        }
    }

    startAnimated = (visible) => {
        if (visible) {
            this.setState({ isVisible: visible }, () => {
                this.startFadeAnimated(visible)
            })
        } else {
            this.startFadeAnimated(visible, (params) => {
                this.setState({ isVisible: visible })
            })
        }
    };

    startFadeAnimated = (visible, endFunc) => {
        let toValue = visible ? 1 : 0;
        this.opacity.setValue(toValue === 0 ? 1 : 0);
        Animated.timing(this.opacity, {
            toValue,
            duration: 300,
            useNativeDriver: true
        }).start((params) => {
            endFunc && endFunc(params)
        })
    };

    startHeightAnimated = (contentHeight) => {
        let height = this.props.visible ? this.props.contentHeight : 0;
        this.contentAnimatedHeight.setValue(height);
        Animated.spring(this.contentAnimatedHeight, {
            toValue: contentHeight,
            duration: 300,
            friction: 7,
        }).start(() => {
            this.preContentHeight = this.props.contentHeight
        })
    };

    _onPressClose = () => {
        this.props.onClose && this.props.onClose();
    };

    render() {
        const { isVisible } = this.state;
        const { renderContentComponent, contentHeight } = this.props;
        return (
            isVisible ? (
                <View style={styles.contentContainer}>
                    <TouchableWithoutFeedback onPress={this._onPressClose}>
                        <Animated.View style={[styles.maskContainer, { opacity: this.opacity }]} />
                    </TouchableWithoutFeedback>
                    <Animated.View style={{ height: this.contentAnimatedHeight, overflow: 'hidden' }}>
                        {renderContentComponent}
                    </Animated.View>
                </View>
            ) : null
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        position: 'absolute',
        top: ScaleSize(60), // 距离的顶部便宜
        right: 0,
        left: 0,
        bottom: 0,
        // overflow: 'hidden',
    },
    maskContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    barContainer: {
        height: ScaleSize(60),
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#eef0f2',
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    barTitle: {
        fontSize: FontSize(13),
        color: '#2e2e2e'
    },
    arrowContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
    },
    rankingArrow: {
        width: ScaleSize(20),
        height: ScaleSize(20),
    }
});

//make this component available to the app
export default DropDownMenu;