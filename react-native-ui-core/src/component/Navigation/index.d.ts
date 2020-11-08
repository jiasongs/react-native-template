import * as React from 'react';
import {
  StyleProp,
  ImageSourcePropType,
  ImageStyle,
  TouchableOpacityProps,
  TextStyle,
  ViewStyle,
  ViewProps,
  Insets
} from 'react-native';
import { ButtonProps } from '../Touchable';

export interface NavigationBarProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  title?: string | number | React.ReactElement | React.ComponentType<any>;
  titleStyle?: StyleProp<TextStyle>;
  renderLeftAction?: Array | () => React.ReactElement | React.ReactElement | React.ComponentType<any>;
  renderRightAction?: Array | () => React.ReactElement | React.ReactElement | React.ComponentType<any>;
  backgroundImage?: number;
  backTitle?: string | number | React.ReactElement | React.ComponentType<any>;
  backTitleStyle?: StyleProp<TextStyle>;
  backIcon?: ImageSourcePropType | React.ReactElement | React.ComponentType<any>;
  backIconStyle?: StyleProp<ImageStyle>;
  backItemSupplement?: boolean;
  onPressBack?: () => void;
  statusBarStyle?: 'default' | 'light-content' | 'dark-content';
  statusBarColor?: string;
  statusBarHidden?: boolean;
  insets?: Insets;
  extraData?: any;
}

export interface NavigationActionItemProps extends ButtonProps {
  extraData?: any;
}

export const NavigationBar: React.ComponentClass<NavigationBarProps>;
export const NavigationActionItem: React.ComponentClass<NavigationActionItemProps>;
