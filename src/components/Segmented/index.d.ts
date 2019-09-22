import * as React from 'react';
import {
  StyleProp,
  ViewProps,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native';
import { ButtonProps } from '../Touchable';

export type IndicatorWidthType = 'none' | 'box' | 'item' | 'custom';
export type IndicatorType = 'normal' | 'lengThen';

export interface SegmentedBarItemProps extends ButtonProps {
  active: boolean;
  activeTitle?: string | number;
  activeIcon?: ImageSourcePropType;
  activeStyle: StyleProp<ViewStyle>;
  activeTitleStyle: StyleProp<TextStyle>;
  activeIconStyle: StyleProp<ImageStyle>;
}

export interface SegmentedBarProps {
  indicatorType?: IndicatorType;
  indicatorWidthType?: IndicatorWidthType;
  style?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  sidebarPosition: 'left' | 'right';
  sidebar: React.ComponentType<any> | React.ReactElement;
  backgroundImage: ImageSourcePropType;
  itemType?: 'solid' | 'clear' | 'outline';
  itemStyle?: StyleProp<ViewStyle>;
  itemActiveStyle?: StyleProp<ViewStyle>;
  itemIcon?: ImageSourcePropType;
  itemActiveIcon?: ImageSourcePropType;
  itemIconStyle?: StyleProp<ImageStyle>;
  itemActiveIconStyle?: StyleProp<ImageStyle>;
  itemIconPosition?: 'top' | 'left' | 'bottom' | 'right';
  itemTitle?: string | number;
  itemActiveTitle?: string | number;
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
  indicatorWidthType?: IndicatorWidthType;
  showSegmentedBar?: boolean;
  initialPage?: number;
  activeIndex?: number;
  lazy: boolean;
  onChange?: (index: number) => void;
}

export const SegmentedView: React.ComponentClass<SegmentedViewProps>;
export const SegmentedScene: React.ComponentClass<SegmentedBarProps>;
