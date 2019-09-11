import * as React from 'react';
import {
  StyleProp,
  TextStyle,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import { OverlayPullProps } from '../Overlay';

export interface Action {
  title: string;
  titleStyle: StyleProp<TextStyle>;
  actionStyle: StyleProp<ViewStyle>;
  onPress: () => void;
}

export interface ActionSheetProps {
  title?: string | React.ReactElement;
  titleStyle?: StyleProp<TextStyle>;
  actions: Array<Action>;
  onPress?: (item) => void;
  onCancel?: () => void;
  option?: OverlayPullProps;
}

export class ActionManager {
  static show(props: ActionSheetProps): number;
  static showView(
    component: React.ReactElement,
    option: OverlayPullProps,
  ): number;
  static hide(key: number): void;
}
