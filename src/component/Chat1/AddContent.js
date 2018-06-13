'use strict';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import ToolAnimated from './ToolAnimated';

class AddContent extends React.PureComponent {

    static propTypes = {
        barHeight: PropTypes.number,
        contentHeight: PropTypes.number,
    };

    static defaultProps = {

    };

    constructor(props) {
        super(props);
        this.itemsData = [
            { type: 1, title: '拍摄', imageSource: '' },
            { type: 2, title: '相册', imageSource: '' },
            { type: 3, title: '语音', imageSource: '' },
            { type: 4, title: '发送简历', imageSource: '' },
            // { type: 4, title: '发送简历', imageSource: '' },
        ]
    }

    startAnimatedSpring = (toValue) => {
        this.toolAnimatedRef.startAnimatedSpring(toValue)
    }

    renderItems = () => {
        return (
            this.itemsData.map((item, index) => {
                return (
                    <View style={styles.itemContainer} key={`${index}`}>
                        <TouchableOpacity>
                            <Image style={styles.itemImage} />
                        </TouchableOpacity>
                        <Text style={styles.itemTitleText}>{item.title}</Text>
                    </View>
                )
            })
        )
    }

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
                style={[styles.container, { height: contentHeight, top: barHeight }]}>
                <this.renderItems />
            </ToolAnimated>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#ebeced',
        backgroundColor: '#ffff',
        justifyContent: 'space-around',
        flexDirection: 'row',
        // flexWrap: 'wrap',
        left: 0,
        right: 0,
        padding: 20,
    },
    itemContainer: {
        alignItems: 'center',
        // backgroundColor: 'blue',
    },
    itemImage: {
        width: 50,
        height: 50,
        backgroundColor: 'red',
    },
    itemTitleText: {
        fontSize: FontSize(12),
        marginTop: 8,
    }
});

export default AddContent