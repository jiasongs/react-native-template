import * as React from 'react';
import {
  StyleProp,
  ViewProps,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native';
import { ButtonPorps } from '../Touchable/Button';

export type IndicatorType = 'none' | 'box' | 'item' | 'custom';

export interface SegmentedBarItemProps extends ButtonPorps {
  active: boolean;
  activeStyle: StyleProp<ViewStyle>;
  activeTitleStyle: StyleProp<TextStyle>;
  activeIconStyle: StyleProp<ImageStyle>;
}

export interface SegmentedBarProps {
  indicatorType?: IndicatorType;
  style?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  sidebarPosition: 'left' | 'right';
  sidebar: React.ComponentType<any> | React.ReactElement;
  backgroundImage: ImageSourcePropType;
  itemType?: 'solid' | 'clear' | 'outline';
  itemStyle?: StyleProp<ViewStyle>;
  itemActiveStyle?: StyleProp<ViewStyle>;
  itemIcon?: ImageSourcePropType;
  itemIconStyle?: StyleProp<ImageStyle>;
  itemActiveIconStyle?: StyleProp<ImageStyle>;
  itemIconPosition?: 'top' | 'left' | 'bottom' | 'right';
  itemTitle?: string | number;
  itemTitleStyle?: StyleProp<TextStyle>;
  itemActiveTitleStyle?: StyleProp<TextStyle>;
  itemSpacingIconAndTitle?: number;
  itemBackgroundImage?: number;
  itemDisabled?: boolean;
  itemDisabledStyle?: StyleProp<ViewStyle>;
  itemDisabledTitleStyle?: StyleProp<TextStyle>;
  itemLoading?: boolean;
  itemLoadingStyle?: StyleProp<ViewStyle>;
  itemRaised?: boolean;
  itemClickInterval?: number;
}

export interface SegmentedViewProps extends SegmentedBarProps {
  style?: StyleProp<ViewStyle>;
  barStyle?: StyleProp<ViewStyle>;
  barBackgroundImage: ImageSourcePropType;
  indicatorType?: IndicatorType;
  showSegmentedBar?: boolean;
  initialPage?: number;
  activeIndex?: number;
  lazy: boolean;
  onChange?: (index: number) => void;
}

export const SegmentedView: React.ComponentClass<SegmentedViewProps>;
export const SegmentedScene: React.ComponentClass<SegmentedBarProps>;
