import React from 'react';
import {
    View,
    Image,
    FlatList,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';

import PropTypes from 'prop-types';
import { EMOTIONS_DATA } from './DataSource';


class EmotionsChildView extends React.PureComponent {

    static propTypes = {
        dataSource: PropTypes.array.isRequired,
        onPress: PropTypes.func,
    };

    static defaultProps = {
        dataSource: [],
    };

    constructor(props) {
        super(props);

    }

    _rednerItem = (item) => {
        if (item.item.value === '/{del') {
            return <TouchableWithoutFeedback onPress={() => this.props.onPress(item.item.value)}>
                <View key={item.item.key} style={styles.itemStyle}>
                    <Image style={styles.deleteStyle} source={require('./emotions/ic_emoji_del.png')} />
                </View>
            </TouchableWithoutFeedback>;
        }
        return <TouchableWithoutFeedback onPress={() => this.props.onPress(item.item.value)}>
            <View key={item.item.key} style={styles.itemStyle}>
                <Image style={styles.emojiStyle} source={EMOTIONS_DATA[item.item.value]} />
            </View>
        </TouchableWithoutFeedback>;

    }

    render() {
        const { style, dataSource } = this.props
        return (
            <FlatList
                style={[styles.container, style]}
                horizontal={false}
                numColumns={7}
                refreshing={false}
                scrollEnabled={false}
                initialNumToRender={21}
                data={dataSource}
                renderItem={this._rednerItem} />
        );
    }

}



const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    itemStyle: {
        width: (SCREEN_WIDTH - 10 * 2) / 7,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    emojiStyle: {
        width: 35,
        height: 35,
    },

    deleteStyle: {
        width: 35,
        height: 24,
    }
});

export default EmotionsChildView