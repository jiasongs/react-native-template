//import liraries
import React from 'react';
import { StyleSheet, Image, } from 'react-native';
import PropTypes from 'prop-types'
// import FastImage from 'react-native-fast-image' // 在安卓上有问题，等作者发布

// 待设计
class ImageView extends React.PureComponent {

    static propTypes = {
        ...Image.propTypes,
        // ...FastImage.propTypes,
        useFastImage: PropTypes.bool
    };

    static defaultProps = {
        ...Image.defaultProps,
        // ...FastImage.defaultProps,
        useFastImage: false
    };

    constructor(props) {
        super(props);

    };

    _renderImage = () => {
        return (
            <Image {...this.props} />
        )
    };

    _renderFastImage = () => {
        return (
            // <FastImage {...this.props} />
            null
        )
    };

    render() {
        const { useFastImage } = this.props
        return (
            useFastImage ? this._renderFastImage() : this._renderImage()
        );
    }
}


const styles = StyleSheet.create({

});

export default ImageView;
