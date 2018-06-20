'use strict';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import ToolAnimated from './ToolAnimated';
import FlatListView from '../FlatListView'

class CommonLg extends React.PureComponent {

    static propTypes = {
        barHeight: PropTypes.number,
        contentHeight: PropTypes.number,
    };

    static defaultProps = {

    };

    constructor(props) {
        super(props);
        this.itemsData = [
            { type: '', title: '我可以把我的简历发给你萨达' },
            { type: '', title: '我可以把我的简历发给你萨达' },
            { type: '', title: '我可以把我的简历发给你萨达' },
            { type: '', title: '我可以把我的简历发给你萨达' },
        ]
    }

    startAnimatedSpring = (toValue) => {
        this.toolAnimatedRef.startAnimatedSpring(toValue)
    }

    _onPress = (text) => {
        const { onPressCommon } = this.props
        onPressCommon && onPressCommon(text)
    }

    _renderItem = (info) => {
        const item = info.item
        const index = info.index
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={() => this._onPress(item.title)}>
                <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
            </TouchableOpacity>
        )
    };

    _renderItemSeparator = () => {
        return (
            <View style={styles.sep} />
        )
    };

    _keyExtractor = (item, index) => {
        return `item_${index}`
    };

    _captureRef = (v) => {
        this.toolAnimatedRef = v
    };

    render() {
        const { contentHeight, barHeight } = this.props
        return (
            <ToolAnimated
                ref={this._captureRef}
                initTranslateY={contentHeight}
                barHeight={barHeight}
                style={[styles.container, { height: contentHeight, top: barHeight }]} >
                <FlatListView
                    ref={this._captureRef}
                    initialRefresh={false}
                    enableLoadMore={false}
                    enableRefresh={false}
                    data={this.itemsData}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._renderItemSeparator}
                />
                <TouchableOpacity>
                    <View style={styles.addContainer}>
                        <Image style={styles.addLgImage} />
                        <Text style={styles.addLgText}>新增</Text>
                    </View>
                </TouchableOpacity>
            </ToolAnimated>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        left: 0,
        right: 0,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#ebeced',
    },
    itemContainer: {
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    itemTitle: {
        color: '#797979',
        fontSize: FontSize(12),
    },
    sep: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#cdcdcd',
    },
    addContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    addLgImage: {
        width: 20,
        height: 20,
        backgroundColor: 'red',
    },
    addLgText: {
        fontSize: FontSize(13),
        color: '#797979',
        marginLeft: 5,
    }
});

export default CommonLg