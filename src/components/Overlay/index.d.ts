import * as React from 'react';
import { StyleProp, ViewProps } from 'react-native';

type RootTransform = 'none' | 'translate' | 'scale';

interface Transform {
  translateX: number;
  translateY: number;
  scaleX: number;
  scaleY: number;
}

interface CustomBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface OverlayBaseProps {
  style?: StyleProp;
  modal?: boolean;
  animated: boolean;
  overlayOpacity?: number;
  overlayPointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto';
  closeOnHardwareBackPress: boolean;
  onAppearCompleted?: () => void;
  onDisappearCompleted?: () => void;
  onCloseRequest?: () => void;
}

export interface OverlayPopProps extends OverlayBaseProps {
  type?: 'none' | 'zoomOut' | 'zoomIn' | 'custom';
  containerStyle?: StyleProp;
  containerPointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto';
  customBounds?: CustomBounds;
}

export interface OverlayPullProps extends OverlayBaseProps {
  type?: 'top' | 'bottom' | 'left' | 'right';
  containerStyle?: StyleProp;
  containerPointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto';
  rootTransform?: RootTransform | Array<Transform>;
  panGestureEnabled: boolean;
}

export const OverlayTopContainer: React.ComponentClass<>;
export const OverlayPop: React.ComponentClass<OverlayPopProps>;
export const OverlayPull: React.ComponentClass<OverlayPullProps>;
