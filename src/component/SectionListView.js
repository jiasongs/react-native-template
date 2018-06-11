'use strict';

//import liraries
import React from 'react'
import { ActivityIndicator, SectionList, RefreshControl, StyleSheet, Text, View, Image } from 'react-native'
import PropTypes from 'prop-types'

// 上拉刷新的状态
const EndReachedStatus = {
    FIRST_LOADED: 'FIRST_LOADED', // 第一次加载
    START_LOADED: 'START_LOADED',  // 已经开始刷新
    WAITING_LOADING: 'WAITING_LOADING',  // 等待着刷新
    ALL_LOADED: 'ALL_LOADED',
};

class SectionListView extends React.PureComponent {


    static propTypes = {
        ...SectionList.propTypes,

        initialRefresh: PropTypes.bool,//列表初始化时是否显示刷新按钮,请求数据结束后需要手动调用stopRefresh方法
        enableLoadMore: PropTypes.bool, //是否能上拉加载
        enableRefresh: PropTypes.bool, //是否能下拉刷新

        onRefresh: PropTypes.func,
        onEndReached: PropTypes.func,

        refreshableColors: PropTypes.array,
        refreshableProgressBackgroundColor: PropTypes.string,
        refreshableSize: PropTypes.any,
        refreshableTintColor: PropTypes.string,
        refreshableTitle: PropTypes.string,

    };
    static defaultProps = {
        ...SectionList.defaultProps,

        initialRefresh: true,
        enableRefresh: true,
        enableLoadMore: true,

        initialNumToRender: 8,

        refreshableColors: ['green'],
        refreshableTitle: '  正在加载...',
    };

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: props.initialRefresh,
            isEndReached: false,
        };
        if (__IOS__) {
            // 解决列表初始化时显示刷新按钮导致的bug
            this._currentEndReachedStatus = props.data.length === 0 && props.initialRefresh ? EndReachedStatus.FIRST_LOADED : EndReachedStatus.WAITING_LOADING;
        } else {
            this._currentEndReachedStatus = EndReachedStatus.WAITING_LOADING
        }
        this._currentContentSize = { contentWidth: 0, contentHeight: 0 }
        this._currentListSize = { width: 0, height: 0 }
        this._currentContentOffset = { x: 0, y: 0 }
    }

    setNativeProps(props) {
        if (this._secionListRef) {
            this._secionListRef.setNativeProps(props);
        }
    };
    scrollToLocation = (option = { animated: true, itemIndex: 0, sectionIndex: 0, viewOffset: 0, viewPosition: 0 }) => {
        if (this._secionListRef) {
            this._secionListRef.scrollToLocation(option)
        }
    };
    scrollToOffset = (option = { offset: 0, animated: true }) => {
        if (this._secionListRef) {
            this._secionListRef.scrollToOffset(option)
        }
    };
    scrollToIndex = (option = { animated: true, index: 0, viewOffset: 0, viewPosition: 0 }) => {
        if (this._secionListRef) {
            this._secionListRef.scrollToIndex(option)
        }
    };
    scrollToItem = (option = { animated: true, item: 0, viewPosition: 0 }) => {
        if (this._secionListRef) {
            this._secionListRef.scrollToItem(option)
        }
    };
    scrollToEnd = (option = { animated: true }) => {
        if (this._secionListRef) {
            this._secionListRef.scrollToEnd(option)
        }
    };
    flashScrollIndicators = () => {
        if (this._secionListRef) {
            this._secionListRef.flashScrollIndicators();
        }
    };
    get scrollResponder() {
        if (this._secionListRef) {
            return this._secionListRef.getScrollResponder();
        }
        return null
    };
    get scrollableNode() {
        if (this._secionListRef) {
            return this._secionListRef.getScrollableNode();
        }
        return null
    };
    get secionListResponder() {
        if (this._secionListRef) {
            return this._secionListRef
        }
        return null
    };
    get contentSize() {
        return this._currentContentSize
    };
    get contentOffset() {
        return this._currentContentOffset
    };
    _onRefresh = () => {
        this.startRefresh();
        console.log('_onRefreshzzzz')
        this.props.onRefresh && this.props.onRefresh(this.stopRefresh)
    };

    _renderRefreshControl = () => {
        const {
            refreshableColors, refreshableProgressBackgroundColor,
            refreshableSize, refreshableTintColor, refreshableTitle,
        } = this.props;
        console.log(this.state.isRefreshing)
        return (
            <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh}
                colors={refreshableColors}
                progressBackgroundColor={refreshableProgressBackgroundColor}
                size={refreshableSize}
                tintColor={refreshableTintColor}
                title={refreshableTitle}
            />
        )
    };
    startRefresh = () => {
        if (!this.state.isRefreshing) {
            console.log('startRefresh')
            if (this._currentEndReachedStatus === EndReachedStatus.ALL_LOADED) {
                this._currentEndReachedStatus = EndReachedStatus.WAITING_LOADING
            }
            this.setState({ isRefreshing: true });
        }
    };
    stopRefresh = () => {
        if (this.state.isRefreshing) {
            setTimeout(() => {
                this.setState({ isRefreshing: false });
            }, 200); // 解决下拉刷新请求过快，导致的bug
        }
    };
    _onEndReached = (params) => {

        const { data, enableLoadMore } = this.props;
        const { isRefreshing, isEndReached } = this.state;
        // 统一解决_onEndReached回调不正确的Bug,以下条件满足之一都不会触发startEndReached，
        // 都不满足时进入下一个条件判断
        // 注意：以下每个判断条件的顺序要一致，不能随意更换
        // 解决如果列表一开始显示刷新按钮,_onEndReached回调不正确的Bug
        if (!enableLoadMore || this._currentEndReachedStatus === EndReachedStatus.START_LOADED
            || this._currentEndReachedStatus === EndReachedStatus.ALL_LOADED
        ) {
            return;
        }
        if (this._currentEndReachedStatus === EndReachedStatus.FIRST_LOADED) {
            this._currentEndReachedStatus = EndReachedStatus.WAITING_LOADING
            return;
        }
        if (data.length === 0) {
            return;
        }
        // bug
        if (isRefreshing || isEndReached) {
            return;
        }
        console.log('contentHeight', this._currentContentSize.contentHeight)
        console.log('height', this._currentListSize.height)
        // 解决内容视图不够列表的高度时,_onEndReached回调不正确的Bug，必须放在FIRST_LOADED后面
        if (this._currentContentSize.contentHeight <= this._currentListSize.height) {
            return
        }
        console.log('_onEndReached')
        this.startEndReached();
        this.props.onEndReached && this.props.onEndReached(this.stopEndReached)
    };
    startEndReached = () => {
        if (!this.state.isEndReached) {
            // console.log('startEndReached');
            this._currentEndReachedStatus = EndReachedStatus.START_LOADED;
            this.setState({ isEndReached: true }, () => {
                // 问题所在，不能显示到视图最底层
                // console.log('this._currentContentSize', this._currentContentSize.contentHeight)
                // let offset = this._currentContentSize.contentHeight - this._currentListSize.height + 30
                // console.log('this.offset', offset)
                // this.scrollToOffset({ offset: offset, animated: true })
            })
        }
    };
    stopEndReached = (option = { allLoad: false }) => {
        if (this.state.isEndReached) {
            console.log('stopEndReached', option)
            setTimeout(() => {
                if (option.allLoad === true) {
                    this._currentEndReachedStatus = EndReachedStatus.ALL_LOADED;
                } else {
                    this._currentEndReachedStatus = EndReachedStatus.WAITING_LOADING;
                }
                this.setState({ isEndReached: false })
            }, 200); // 解决上拉加载请求过快，导致的bug
        }
    };
    _renderFooter = () => {
        const { data } = this.props;
        const { isEndReached } = this.state;
        const status = this._currentEndReachedStatus === EndReachedStatus.ALL_LOADED;
        if (isEndReached === false || data.length === 0) {
            if (status) {
                return <FooterComponent loading={this.state.isEndReached} allLoad={status} />
            }
            return null
        } else if (isEndReached) {
            return <FooterComponent loading={this.state.isEndReached} allLoad={status} />
        }
        return null
    };
    _renderSeparator = () => {
        return null
    };
    _renderEmptyView = () => {
        console.log('_renderEmptyView')
        return (
            <EmptyComponent />
        )
    };
    _onContentSizeChange = (contentWidth, contentHeight) => {
        const { onContentSizeChange } = this.props
        this._currentContentSize = { contentWidth, contentHeight }
        onContentSizeChange && onContentSizeChange(contentWidth, contentHeight)
    };
    _onLayout = (event) => {
        const { onLayout } = this.props
        console.log(event.nativeEvent.layout.height)
        if (event.nativeEvent.layout.height != 0 && event.nativeEvent.layout.width != 0) {
            this._currentListSize = { width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height }
        }
        onLayout && onLayout(event)
    };
    _onScroll = (event) => {
        const { onScroll } = this.props
        this._currentContentOffset = event.nativeEvent.contentOffset
        onScroll && onScroll(event)
    };
    _captureRef = (v) => {
        this._secionListRef = v
    };

    render() {
        const { onRefresh, onEndReached, onLayout, onContentSizeChange, enableRefresh, enableLoadMore, ...others } = this.props;
        // console.log('render');
        return (
            <SectionList
                ref={this._captureRef}
                onLayout={this._onLayout}
                removeClippedSubviews={true}
                onScroll={this._onScroll}
                onContentSizeChange={this._onContentSizeChange}
                ListEmptyComponent={this._renderEmptyView}
                ListFooterComponent={enableLoadMore ? this._renderFooter : null}
                refreshControl={enableRefresh ? this._renderRefreshControl() : null}
                {...others}
                onEndReachedThreshold={0.1} // 必须在{...}后面，否则就会出问题。也不知道是为什么，
                onEndReached={this._onEndReached}
            />
        );
    }
}


// create a component
class FooterComponent extends React.PureComponent {

    static propTypes = {
        loading: PropTypes.bool,
        allLoad: PropTypes.bool,// 是否加载完毕
    };
    static defaultProps = {
        loading: false,
        allLoad: false
    };

    render() {
        const { loading, allLoad } = this.props;
        // console.log('FooterComponent');
        return (
            <View style={styles.footerContainer}>
                {!allLoad ? (
                    <View style={styles.indicatorContainer}>
                        <ActivityIndicator
                            animating={loading}
                            // color='red'
                            size="small"
                            hidesWhenStopped={true}
                        />
                        <Text style={styles.footerText}>正在加载...</Text>
                    </View>) : (
                        <Text style={styles.footerText}>没有更多数据</Text>
                    )}
            </View>
        );
    }
}

// create a component
class EmptyComponent extends React.PureComponent {
    static propTypes = {

    };
    static defaultProps = {

    };

    render() {

        return (
            <View style={styles.emptyContainer}>
                <Image style={styles.emptyImage} source={Images.icon_no_record} />
                <Text style={styles.emptyText}>暂无数据</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    indicatorContainer: {
        // marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        marginLeft: 10,
        height: 30,
        lineHeight: 30,
        fontSize: FontSize(13),
        color: '#999999',
        // backgroundColor: 'green',
        // marginBottom: 10,
    },
    emptyContainer: {
        height: ScaleSize(700),
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue',
    },
    emptyText: {
        marginTop: ScaleSize(10),
        color: '#cdcdcd',
        fontSize: FontSize(13),
    },
    emptyImage: {
        width: ScaleSize(80),
        height: ScaleSize(80)
    }
});

//make this component available to the app
export default SectionListView;
