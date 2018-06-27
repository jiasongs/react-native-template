'use strict'
import React, { PureComponent } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    ViewPagerAndroid,
    Image,
    ImageBackground
} from 'react-native';
import PropTypes from 'prop-types'
import SegmentedBar from './SegmentedBar'
import StickyHeader from '../StickyHeader';

class CusSegmentedView extends PureComponent {

    static propTypes = {
        ...SegmentedBar.propTypes,
        showSegmentedBar: PropTypes.bool,
        backgroundImage: PropTypes.number, // SegmentedBar的背景图片
        initialPage: PropTypes.number,
        scrollEnabled: PropTypes.bool,
        renderCustomBar: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
        // 在安卓上，如果你使用ScrollView包裹CusSegmentedView，那么务必给一个pageHeight高度值,
        // iOS上不用设置，但是嵌套ScrollView在iOS上想占满屏幕也必须给View一个高度才行。
        pageHeight: PropTypes.number,
        lazy: PropTypes.bool, // 懒加载
        lazyDelay: PropTypes.number, // 如果你的页面是请求数据，请设置延迟为0。如果你的页面是直接就加载的，请设置350或者自定义
        // 悬浮的SegmentedBar
        stickyScrollY: PropTypes.any,
        stickyHeaderY: PropTypes.number,
    }
    static defaultProps = {
        ...SegmentedBar.defaultProps,
        initialPage: 0,
        scrollEnabled: true,
        lazy: true,
        lazyDelay: 0,
        pageHeight: -1,
        showSegmentedBar: true,
        // backgroundImage: Images.img_bg_navbar
    }
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0, activeIndex: props.initialPage }
        this.isScrollMark = false
    }

    componentDidMount() {
        if (__IOS__) {
            this.time1 = setTimeout(() => this.changeScrollPage(this.props.initialPage, false), 50);
        }
    }

    componentWillUnmount() {
        this.time1 && clearTimeout(this.time1)
        this.time2 && clearTimeout(this.time2)
        console.log(this.time1, this.time2)
    }

    setNativeProps(props) {
        if (__IOS__ && this._scrollRef) {
            this._scrollRef.setNativeProps(props);
        }
    };

    changeScrollPage = (index, animated) => {
        const { width } = this.state
        if (__IOS__) {
            this._scrollRef.scrollTo({ x: width * index, y: 0, animated: animated });
        } else {
            animated ? this._scrollRef.setPage(index) : this._scrollRef.setPageWithoutAnimation(index)
        }
    }

    _onChangeBar = (index) => {
        const { animated } = this.props
        if (this.state.activeIndex != index) {
            this.changeScrollPage(index, false)
        }
    }

    _changePage = (cardIndex) => {
        if (this.state.activeIndex != cardIndex && !this.isScrollMark) {
            const { lazy, lazyDelay } = this.props
            console.log(this.state.activeIndex, cardIndex)
            this.isScrollMark = true
            this.cusSegmentedBar && this.cusSegmentedBar.changeBarIndex(cardIndex)
            requestAnimationFrame(() => {
                console.log('requestAnimationFrame')
                let delay = lazy ? lazyDelay : 0
                this.time2 = setTimeout(() => {
                    this.setState({ activeIndex: cardIndex }, () => {
                        this.isScrollMark = false
                    })
                }, delay);
            })
        }
    }
    _onScroll = (e) => {
        const { width } = this.state
        const { x } = e.nativeEvent.contentOffset;
        const cardIndex = Math.round(x / width);
        this._changePage(cardIndex)

    }
    _onPageScroll = (e) => {
        const { lazy, lazyDelay } = this.props
        const offset = e.nativeEvent.offset + e.nativeEvent.position;
        const cardIndex = Math.round(offset);
        this._changePage(cardIndex)
    }

    _onLayout = (e) => {
        const width = e.nativeEvent.layout.width
        const height = e.nativeEvent.layout.height
        this.setState({ width, height })
    }

    _captureRef = (v) => {
        this._scrollRef = v
    }

    _renderScrollView = () => {
        const { children, scrollEnabled, initialPage, lazy, keyboardShouldPersistTaps } = this.props
        const { width, activeIndex } = this.state
        return (
            <ScrollView
                ref={this._captureRef}
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onScroll={this._onScroll}
                scrollEnabled={scrollEnabled}
                scrollEventThrottle={16}
                onLayout={this._onLayout}
                keyboardShouldPersistTaps={keyboardShouldPersistTaps}
            >
                {children.map((item, index) => {
                    return (
                        <SceneView key={`todo_page${index}`}
                            lazy={lazy}
                            width={width}
                            item={item}
                            index={index}
                            activeIndex={activeIndex}
                            initialPage={initialPage}
                        />
                    )
                })}
            </ScrollView>
        )
    }

    _renderViewPagerAndroid = () => {
        const { children, initialPage, scrollEnabled, pageHeight, lazy } = this.props
        const { width, activeIndex } = this.state
        let h = pageHeight != -1 ? { height: pageHeight } : {}
        return (
            <ViewPagerAndroid
                ref={this._captureRef}
                style={[styles.viewPagerAndroid, h]}
                initialPage={initialPage}
                onPageScroll={this._onPageScroll}
                onPageSelected={this._onPageSelected}
                scrollEnabled={scrollEnabled}
                onLayout={this._onLayout}
            >
                {children.map((item, index) => {
                    return (
                        <View key={`todo_page${index}`} style={{ width }}>
                            <SceneView
                                lazy={lazy}
                                width={width}
                                item={item}
                                index={index}
                                activeIndex={activeIndex}
                                initialPage={initialPage}
                            />
                        </View>
                    )
                })}
            </ViewPagerAndroid>
        )
    }

    _renderSegmentedBar = () => {
        const { stickyScrollY, stickyHeaderY } = this.props
        console.log(stickyScrollY)
        return (
            <StickyHeader
                stickyHeaderY={stickyHeaderY} // 滑动到多少悬浮
                stickyScrollY={stickyScrollY}
            >
                <CusSegmentedBar
                    ref={v => this.cusSegmentedBar = v}
                    onChangeBar={this._onChangeBar}
                    {...this.props}
                />
            </StickyHeader>

        )
    }

    render() {
        const { style, onLayout, showSegmentedBar } = this.props
        console.log('rednder')
        return (
            <View style={[styles.container, style]}
            // onLayout={(e) => onLayout && onLayout(e)}
            >
                {showSegmentedBar ? this._renderSegmentedBar() : null}
                {
                    __IOS__ ? this._renderScrollView() : this._renderViewPagerAndroid()
                }
            </View>
        );
    }
}

// create a component
class CusSegmentedBar extends PureComponent {

    constructor(props) {
        super(props);
        this.state = { activeIndex: props.initialPage }
    }

    changeBarIndex = (cardIndex) => {
        const { onChange } = this.props
        if (cardIndex != this.state.activeIndex) {
            this.setState({ activeIndex: cardIndex });
            onChange && onChange(cardIndex)
        }
    }

    _onChangeBar = (index) => {
        const { onChangeBar, onChange } = this.props
        if (index != this.state.activeIndex) {
            this.setState({ activeIndex: index });
            onChangeBar && onChangeBar(index)
            onChange && onChange(index)
        }
    }

    render() {
        let { onChange, renderCustomBar, children, style, barStyle, backgroundImage, ...others } = this.props
        let customBar;
        if (renderCustomBar && React.isValidElement(renderCustomBar)) {
            customBar = renderCustomBar
        } else if (typeof renderCustomBar == 'function') {
            customBar = <this.props.renderCustomBar />
        }

        return (
            <View style={styles.barStyleContainer} >
                <ImageBackground style={styles.segmentedBarImage} source={backgroundImage} />
                <SegmentedBar
                    style={[styles.barStyle, barStyle]}
                    activeIndex={this.state.activeIndex}
                    onChange={this._onChangeBar}
                    {...others}
                >
                    {customBar ? customBar : children.map((item, index) => {
                        const { style, ...itemOthers } = item.props
                        return <SegmentedBar.Item
                            {...itemOthers}
                            key={`todo_bar${index}`}
                        />
                    }
                    )}
                </SegmentedBar>
            </View >
        );
    }
}

// create a component
class SceneView extends React.PureComponent {
    static propTypes = {
        item: PropTypes.object,
        width: PropTypes.number,
        index: PropTypes.number,
        activeIndex: PropTypes.number,
        initialPage: PropTypes.number,
        lazy: PropTypes.bool
    }
    static defaultProps = {
        initialPage: 0,
        activeIndex: 0,
    }
    constructor(props) {
        super(props);
        this.state = { isFocused: props.lazy ? props.index == props.initialPage : true }

    }
    componentWillReceiveProps(nextProps) {
        const { index } = this.props
        if (!this.state.isFocused && nextProps.activeIndex == index) {
            this.setState({ isFocused: true })
        }
    }
    render() {
        const { width, item } = this.props
        const { isFocused } = this.state
        console.log('isFocused', isFocused)
        return (
            isFocused ? React.cloneElement(item, {
                style: [item.props.style, { width }],
            }) : <View style={{ width }} />
        );
    }
}


// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewPagerAndroid: {
        flex: 1,
    },
    barStyle: {
        height: 30,
        backgroundColor: '#fff',
        // backgroundColor: 'red',
    },
    segmentedBarImage: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
    barStyleContainer: {
        overflow: 'hidden',
        // backgroundColor: '#fff',
    }
});

//make this component available to the app
export default CusSegmentedView;
