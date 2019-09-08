import * as React from 'react';
import { StyleProp, ImageStyle, ImageSourcePropType } from 'react-native';
import { FastImageProperties } from 'react-native-fast-image';

export interface ImageViewProps extends FastImageProperties {
  style?: StyleProp<ImageStyle>;
  maxImageWidth?: boolean;
  useOpacity?: boolean;
  placeholderImage?: ImageSourcePropType;
  placeholderStyle?: StyleProp<ImageStyle>;
}

const ImageView: React.ComponentClass<ImageViewProps>;

export default ImageView;
