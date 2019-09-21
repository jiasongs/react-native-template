import * as React from 'react';
import { StyleProp, ViewStyle, LayoutRectangle } from 'react-native';

type AnchorPoint =
  | 'center'
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

export interface OverlayBaseProps {
  style?: StyleProp<ViewStyle>;
  modal?: boolean;
  maskOpacity?: number;
  maskPointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto';
  closeOnHardwareBackPress: boolean;
  onPrepare?: () => void;
  onAppearCompleted?: () => void;
  onDisappearCompleted?: () => void;
}

export interface OverlayPreviewProps extends OverlayBaseProps {
  type?: 'none' | 'zoomIn';
  anchorPoint?: AnchorPoint;
  fromLayout: LayoutRectangle;
  toLayout: LayoutRectangle | null;
  containerStyle?: StyleProp<ViewStyle>;
  containerPointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto';
}

export interface OverlayPopProps extends OverlayBaseProps {
  type?: 'none' | 'zoomOut' | 'zoomIn';
  anchorPoint?: AnchorPoint;
  containerStyle?: StyleProp<ViewStyle>;
  containerPointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto';
}

export interface OverlayPullProps extends OverlayBaseProps {
  type?: 'top' | 'bottom' | 'left' | 'right';
  containerStyle?: StyleProp<ViewStyle>;
  containerPointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto';
  rootScale?: number;
  rootStyle?: StyleProp<ViewStyle>;
  panGestureEnabled: boolean;
}

export const OverlayProvider: React.ComponentClass<>;
export const OverlayPop: React.ComponentClass<OverlayPopProps>;
export const OverlayPull: React.ComponentClass<OverlayPullProps>;
export const OverlayPreview: React.ComponentClass<OverlayPreviewProps>;
export class OverlayManager {
  static preview(
    component: React.ReactElement,
    option: OverlayPreviewProps,
  ): number;
  static pull(component: React.ReactElement, option: OverlayPullProps): number;
  static pop(component: React.ReactElement, option: OverlayPopProps): number;
  static show(component: React.ReactElement): number;
  static hide(key: number, animate: boolean): void;
  static hideAll(): void;
}
