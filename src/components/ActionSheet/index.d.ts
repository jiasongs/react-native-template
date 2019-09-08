import * as React from 'react';
import { StyleProp, TextStyle, GestureResponderEvent } from 'react-native';
import { OverlayPullProps } from '../Overlay';

export interface Action {
  title: string;
  titleStyle: StyleProp<TextStyle>;
  onPress: () => void;
}

export interface ActionSheetProps extends OverlayPullProps {
  title?: string | React.ReactElement;
  titleStyle?: StyleProp<TextStyle>;
  actions: Array<Action>;
  onPress?: (item) => void;
  onCancel?: () => void;
}

export class ActionManager {
  static show(props: ActionSheetProps): void;
  static showView(
    component: React.ReactElement,
    option: OverlayPullProps,
  ): void;
  static hide(): void;
}
