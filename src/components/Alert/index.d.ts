import * as React from 'react';
import { TextStyle, GestureResponderEvent } from 'react-native';
import { OverlayPopProps } from '../Overlay';

export interface Alert {
  title: string;
  titleStyle: TextStyle;
  onPress: () => void;
}

export interface AlertViewProps extends OverlayPopProps {
  title?: string | React.ReactElement;
  titleStyle?: TextStyle;
  detail?: string | React.ReactElement;
  detailStyle?: TextStyle;
  actions: Array<Alert>;
  onPress?: (item) => void;
}

export class AlertManager {
  static show(props: AlertViewProps): void;
  static showView(component: React.ReactElement, option: OverlayPopProps): void;
  static hide(): void;
}
