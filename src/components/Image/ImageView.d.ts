import * as React from 'react';
import {
  StyleProp,
  ImageStyle,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import { FastImageProperties } from 'react-native-fast-image';

export interface ImageViewProps extends FastImageProperties {
  style?: StyleProp<ImageStyle>;
  useGradient?: boolean;
  maxImageWidth?: boolean;
  placeholderStyle?: StyleProp<ViewStyle>;
  placeholderImage?: ImageSourcePropType;
  placeholderImageStyle?: StyleProp<ImageStyle>;
}

const ImageView: React.ComponentClass<ImageViewProps>;

export default ImageView;
