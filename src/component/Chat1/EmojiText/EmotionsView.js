import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import EmotionsChildView from './EmotionsChildView';
import { EMOTIONS_DATA, EMOTIONS_ZHCN } from './DataSource';
import { Carousel } from 'teaset';

class EmotionsView extends React.PureComponent {

    static propTypes = {
        onSelected: PropTypes.func
    }

    static defaultProps = {

    }

    constructor(props) {
        super(props);
        this.pageItems = this._renderPager()
    }

    _onSelected = (code) => {
        const { onSelected } = this.props
        onSelected && onSelected(EMOTIONS_ZHCN[code])
    }

    _renderPager() {
        let pageItems = [];
        let dataKeys = [];
        //抽取代表符
        let index = 0;
        for (const key in EMOTIONS_DATA) {
            if (EMOTIONS_DATA.hasOwnProperty(key)) {
                dataKeys.push({
                    key: index,
                    value: key,
                });
            }
            index++
        }
        for (let index = 0; index < 5; index++) {
            let page = dataKeys.slice(index * 20, index * 20 + 20);
            page.push({ key: 100 + index, value: '/{del' })
            pageItems.push(page)
        }
        return pageItems;
    }

    render() {
        const { style } = this.props
        return (
            <Carousel
                style={[styles.container, style]}
                carousel={false}
                cycle={false}
                control={true}>
                {this.pageItems.map((item, index) => {
                    return (
                        <EmotionsChildView
                            key={`emoji_child_${index}`}
                            dataSource={item}
                            onPress={this._onSelected}
                        />
                    )
                })}
            </Carousel>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        width: 375,
        height: 175,
        // backgroundColor: 'green',
    },
    dotStyle: {
        backgroundColor: '#f5f5f5',
    },

    selectedDotStyle: {
        backgroundColor: '#BBBBBB',
    },

});

export default EmotionsView