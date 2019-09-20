import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ButtonProps } from '../Touchable/Button.js';
import { OverlayPreviewProps } from '../Overlay';

type AnchorPoint =
  | 'none'
  | 'left'
  | 'leftTop'
  | 'leftBottom'
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'right'
  | 'rightTop'
  | 'rightBottom';

export interface PopoverArrowProps {
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  arrow?: AnchorPoint;
  arrowSize?: number;
  arrowPadding?: number;
}

export interface Option extends OverlayPreviewProps {
  viewRef?: React.ReactElement;
}

export interface PopoverMenuProps extends PopoverArrowProps {
  type?: 'none' | 'vertical' | 'horizontal';
  actions?: Array<ButtonProps>;
  children?: React.ReactChildren;
  option?: Option;
}

export class PopoverManager {
  static showMenu(props: PopoverMenuProps): number;
  static showView(component: React.ReactElement, option: Option): void;
  static hide(key: number): void;
}
