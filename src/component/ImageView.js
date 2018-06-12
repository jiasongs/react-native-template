//import liraries
import React from 'react';
import { StyleSheet, Image, } from 'react-native';
import PropTypes from 'prop-types'
// import FastImage from 'react-native-fast-image' // 在安卓上有问题，等作者发布

// 加载网络图片
class ImageView extends React.PureComponent {

    static propTypes = {
        ...Image.propTypes,
        maxImageWidth: PropTypes.number,
        defaultSize: PropTypes.shape({ width: PropTypes.number, height: PropTypes.number, }),
        useMaxImage: PropTypes.bool,
        useFastImage: PropTypes.bool
    };

    static defaultProps = {
        ...Image.defaultProps,
        maxImageWidth: SCREEN_WIDTH,
        defaultSize: { width: 0, height: 0 },
        useFastImage: false,
        useMaxImage: false
    };

    constructor(props) {
        super(props);
        this.state = { imageSize: props.defaultSize }
        this.unmount = false
    };

    componentDidMount() {
        const { useFastImage, useMaxImage } = this.props
        if (!useFastImage && useMaxImage) {
            this._loadImage()
        }
    }

    componentWillUnmount() {
        this.unmount = true
    }

    _loadImage = () => {
        const { maxImageWidth, source } = this.props
        if (source.uri === undefined) {
            return;
        }
        let uri = source.uri
        Image.getSize(uri, (width, height) => {
            if (width >= maxImageWidth) {
                height = (maxImageWidth / width) * height
                width = maxImageWidth
            }
            if (!this.unmount) {
                this.setState({ imageSize: { width, height } })
            }
        }, (error) => { })
    }

    _renderImage = () => {
        const { style, ...others } = this.props
        const { imageSize } = this.state
        return (
            <Image style={[imageSize, style]} {...others} />
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
