'use strict';
import React, { useCallback, useMemo, useContext } from 'react';
import { StyleSheet, ViewPropTypes, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import Button from '../Touchable/Button';
import { ThemeContext } from '../../config/theme';

function SegmentedBarItem(props) {
  const {
    index,
    onBoxLayout,
    children,
    onPress,
    active,
    style,
    activeStyle,
    title,
    activeTitle,
    titleStyle,
    activeTitleStyle,
    icon,
    activeIcon,
    iconStyle,
    activeIconStyle,
    indicatorType,
    ...others
  } = props;

  const themeValue = useContext(ThemeContext);

  const onBoxLayoutBack = useCallback(
    (event) => {
      onBoxLayout && onBoxLayout(event, index);
    },
    [index, onBoxLayout],
  );

  const onPressBack = useCallback(() => {
    onPress && onPress(index);
  }, [index, onPress]);

  const buildStyles = useMemo(() => {
    const segmentedBarItem = themeValue.segmented.segmentedBarItem;
    let newIcon = icon;
    let newTitle = title;
    const newStyle = [segmentedBarItem.style];
    const newTitleStyle = [segmentedBarItem.titleStyle];
    const newIconStyle = [segmentedBarItem.iconStyle];
    if (indicatorType === 'item') {
      newStyle.push(styles.indicatorItemStyle);
    } else {
      newStyle.push(styles.indicatorBoxStyle);
    }
    newStyle.push(style);
    newTitleStyle.push(
      StyleSheet.flatten([styles.normalTitleStyle, titleStyle]),
    );
    newIconStyle.push(StyleSheet.flatten([styles.normalIconStyle, iconStyle]));
    if (active) {
      if (activeIcon) {
        newIcon = activeIcon;
      }
      if (activeTitle) {
        newTitle = activeTitle;
      }
      newStyle.push(
        StyleSheet.flatten([
          segmentedBarItem.activeStyle,
          styles.activeStyle,
          activeStyle,
        ]),
      );
      newTitleStyle.push(
        StyleSheet.flatten([
          segmentedBarItem.activeTitleStyle,
          styles.activeTitleSyle,
          activeTitleStyle,
        ]),
      );
      newIconStyle.push(
        StyleSheet.flatten([
          segmentedBarItem.activeIconStyle,
          styles.activeIconSyle,
          activeIconStyle,
        ]),
      );
    }

    return {
      icon: newIcon,
      title: newTitle,
      style: [...newStyle],
      titleStyle: [...newTitleStyle],
      iconStyle: [...newIconStyle],
    };
  }, [
    active,
    activeIcon,
    activeIconStyle,
    activeStyle,
    activeTitle,
    activeTitleStyle,
    icon,
    iconStyle,
    indicatorType,
    style,
    themeValue.segmented.segmentedBarItem,
    title,
    titleStyle,
  ]);

  return (
    <Button
      {...others}
      type={'clear'}
      activeOpacity={1.0}
      onLayout={onBoxLayoutBack}
      style={buildStyles.style}
      title={buildStyles.title}
      titleStyle={buildStyles.titleStyle}
      icon={buildStyles.icon}
      iconStyle={buildStyles.iconStyle}
      onPress={onPressBack}
    />
  );
}

const styles = StyleSheet.create({
  indicatorBoxStyle: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  indicatorItemStyle: {
    marginHorizontal: 12,
    marginVertical: 12,
  },
  activeStyle: {},
  normalTitleStyle: {},
  activeTitleSyle: {},
  normalIconStyle: {},
  activeIconSyle: {},
});

SegmentedBarItem.propTypes = {
  ...Button.propTypes,
  active: PropTypes.bool,
  style: ViewPropTypes.style,
  activeStyle: ViewPropTypes.style,
  activeTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  titleStyle: Text.propTypes.style,
  activeTitleStyle: Text.propTypes.style,
  activeIcon: Image.propTypes.source,
  iconStyle: Image.propTypes.style,
  activeIconStyle: Image.propTypes.style,
};

SegmentedBarItem.defaultProps = {
  ...Button.defaultProps,
};

export default React.memo(SegmentedBarItem);
