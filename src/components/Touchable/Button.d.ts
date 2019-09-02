import * as React from 'react';
import {
  StyleProp,
  ImageSourcePropType,
  ImageStyle,
  TouchableOpacityProps,
  TextStyle,
} from 'react-native';

export interface ButtonPorps extends TouchableOpacityProps {
  type?: 'solid' | 'clear' | 'outline';
  icon?: ImageSourcePropType;
  iconStyle?: ImageStyle;
  iconPosition?: 'top' | 'left' | 'bottom' | 'right';
  title?: string | number;
  titleStyle?: TextStyle;
  spacingIconAndTitle?: number;
  backgroundImage?: number;
  disabled?: boolean;
  disabledStyle?: StyleProp;
  disabledTitleStyle?: TextStyle;
  loading?: boolean;
  loadingStyle?: StyleProp;
  raised?: boolean;
  clickInterval?: number;
}

const Button: React.ComponentClass<ButtonPorps>;

export default Button;
