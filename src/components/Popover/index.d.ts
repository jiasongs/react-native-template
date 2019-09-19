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

export interface PopoverMenuProps extends PopoverArrowProps {
  type?: 'vertical' | 'horizontal';
  actions: Array<ButtonProps>;
}

export interface MenuManagerProps extends PopoverMenuProps {
  viewRef: React.ReactElement;
  option: OverlayPreviewProps;
}

export class PopoverManager {
  static showMenu(props: MenuManagerProps): number;
  static showView(
    component: React.ReactElement,
    option: OverlayPreviewProps,
  ): void;
  static hide(key: number): void;
}
