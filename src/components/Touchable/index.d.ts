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

type () => React.ReactElement

export interface ButtonProps extends TouchableOpacityProps, ViewProps {
  type?: 'solid' | 'clear' | 'outline';
  icon?: ImageSourcePropType | React.ReactElement | React.ComponentType<any>;
  iconStyle?: StyleProp<ImageStyle>;
  iconPosition?: 'top' | 'left' | 'bottom' | 'right';
  title?: string | number | React.ReactElement | React.ComponentType<any>;
  titleStyle?: StyleProp<TextStyle>;
  spacingIconAndTitle?: number;
  backgroundImage?: number | React.ReactElement | React.ComponentType<any>;
  disabledOnly?: boolean;
  disabled?: boolean;
  disabledStyle?: StyleProp<ViewStyle>;
  disabledTitleStyle?: StyleProp<TextStyle>;
  disabledIconStyle?: StyleProp<ImageStyle>;
  loading?: boolean;
  loadingStyle?: StyleProp<ViewStyle>;
  raised?: boolean;
  clickInterval?: number;
}

export const Button: React.ComponentClass<ButtonProps>;
