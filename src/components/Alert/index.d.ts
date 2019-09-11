import * as React from 'react';
import {
  StyleProp,
  TextStyle,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import { OverlayPopProps } from '../Overlay';

export interface Alert {
  title: string;
  titleStyle: StyleProp<TextStyle>;
  actionStyle: StyleProp<ViewStyle>;
  onPress: () => void;
}

export interface AlertViewProps extends OverlayPopProps {
  title?: string | React.ReactElement;
  titleStyle?: StyleProp<TextStyle>;
  detail?: string | React.ReactElement;
  detailStyle?: StyleProp<TextStyle>;
  actions: Array<Alert>;
  onPress?: (item) => void;
}

export class AlertManager {
  static show(props: AlertViewProps): number;
  static showView(
    component: React.ReactElement,
    option: OverlayPopProps,
  ): number;
  static hide(key: number): void;
}
