import * as React from 'react';
import {
  StyleProp,
  ImageSourcePropType,
  ImageStyle,
  TouchableOpacityProps,
  TextStyle,
  ViewStyle,
  ViewProps,
} from 'react-native';

export interface ButtonProps extends TouchableOpacityProps, ViewProps {
  type?: 'solid' | 'clear' | 'outline';
  icon?: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
  iconPosition?: 'top' | 'left' | 'bottom' | 'right';
  title?: string | number;
  titleStyle?: StyleProp<TextStyle>;
  spacingIconAndTitle?: number;
  backgroundImage?: number;
  disabled?: boolean;
  disabledStyle?: StyleProp<ViewStyle>;
  disabledTitleStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  loadingStyle?: StyleProp<ViewStyle>;
  raised?: boolean;
  clickInterval?: number;
}

export const Button: React.ComponentClass<ButtonProps>;
