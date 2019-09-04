import * as React from 'react';
import { ImageStyle, ImageSourcePropType } from 'react-native';
import { FastImageProperties } from 'react-native-fast-image';

export interface ImageViewProps extends FastImageProperties {
  maxImageWidth?: boolean;
  useOpacity?: boolean;
  placeholderImage?: ImageSourcePropType;
  placeholderStyle?: ImageStyle;
}

const ImageView: React.ComponentClass<ImageViewProps>;

export default ImageView;
