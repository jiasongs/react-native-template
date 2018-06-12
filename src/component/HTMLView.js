'use strict';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types'
import HTML from 'react-native-render-html';
import ImageView from '../component/ImageView'

class HTMLView extends React.PureComponent {

    static propTypes = {
        ...HTML.propTypes,
        imageStyle: PropTypes.object,
        maxImageWidth: PropTypes.number,
        imageDefaultSize: PropTypes.shape({ width: PropTypes.number, height: PropTypes.number, }),
    };

    static defaultProps = {
        ...HTML.defaultProps,
        imageDefaultSize: { width: 0, height: 0 },
    };


    _renderImage = (htmlAttribs, children, convertedCSSStyles, passProps) => {
        if (htmlAttribs.src === undefined) {
            return null
        }
        const { imageStyle, imageDefaultSize, maxImageWidth } = this.props
        return (
            <ImageView
                style={imageStyle}
                useMaxImage={true}
                key={`html_image_${passProps.nodeIndex}`}
                source={{ uri: htmlAttribs.src }}
                defaultSize={imageDefaultSize}
                maxImageWidth={maxImageWidth}
            />
        )
    };

    render() {
        const { renderers, imageStyle, imageDefaultSize, maxImageWidth, ...others } = this.props
        return (
            <HTML
                {...others}
                renderers={{
                    img: this._renderImage
                }}
            />
        );
    }
}

const styles = StyleSheet.create({

});

export default HTMLView