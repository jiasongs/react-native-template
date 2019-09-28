import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ButtonProps } from '../Touchable';
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

export interface PopoverPreviewProps extends PopoverArrowProps, ButtonProps {
  menuType?: 'none' | 'vertical' | 'horizontal';
  menuStyle?: StyleProp<ViewStyle>;
  menuContentStyle?: StyleProp<ViewStyle>;
  menuChildren?: React.ReactChildren;
  menuActions?: Array<ButtonProps>;
  option?: Option;
}

export const PopoverArrow: React.ComponentClass<PopoverArrowProps>;
export const PopoverMenu: React.ComponentClass<PopoverMenuProps>;
export const PopoverPreview: React.ComponentClass<PopoverPreviewProps>;
export class PopoverMenuManager {
  static showMenu(props: PopoverMenuProps): number;
  static showView(component: React.ReactElement, option: Option): void;
  static hide(key: number): void;
}
