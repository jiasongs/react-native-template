'use strict';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, ViewPropTypes, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import Button from '../Touchable/Button';

function SegmentedBarItem(props) {
  const {
    index,
    onBoxLayout,
    children,
    onPress,
    active,
    style,
    activeStyle,
    titleStyle,
    activeTitleStyle,
    iconStyle,
    activeIconStyle,
    barType,
    ...others
  } = props;

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
    const newStyle = [];
    const newTitleStyle = [styles.normalTitleStyle];
    const newIconStyle = [styles.normalIconStyle];
    if (barType === 'item') {
      newStyle.push({
        marginHorizontal: 20,
        marginVertical: 12,
      });
    } else {
      newStyle.push(styles.normalStyle);
    }
    newStyle.push(style);
    newTitleStyle.push(titleStyle);
    newIconStyle.push(iconStyle);
    if (active) {
      newStyle.push([styles.activeStyle, activeStyle]);
      newTitleStyle.push([styles.activeTitleSyle, activeTitleStyle]);
      newIconStyle.push([styles.activeIconSyle, activeIconStyle]);
    }
    return {
      style: [...newStyle],
      titleStyle: [...newTitleStyle],
      iconStyle: [...newIconStyle],
    };
  }, [
    active,
    activeIconStyle,
    activeStyle,
    activeTitleStyle,
    barType,
    iconStyle,
    style,
    titleStyle,
  ]);

  return (
    <Button
      {...others}
      type={'clear'}
      activeOpacity={1.0}
      onLayout={onBoxLayoutBack}
      style={buildStyles.style}
      titleStyle={buildStyles.titleStyle}
      iconStyle={buildStyles.iconStyle}
      onPress={onPressBack}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  normalStyle: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  activeStyle: {},
  normalTitleStyle: {},
  activeTitleSyle: {},
  normalIconStyle: {},
  activeIconSyle: {},
});

SegmentedBarItem.propTypes = {
  ...Button.type.propTypes,
  active: PropTypes.bool,
  style: ViewPropTypes.style,
  activeStyle: ViewPropTypes.style,
  titleStyle: Text.propTypes.style,
  activeTitleStyle: Text.propTypes.style,
  iconStyle: Image.propTypes.style,
  activeIconStyle: Image.propTypes.style,
};

SegmentedBarItem.defaultProps = {
  ...Button.type.defaultProps,
};

export default React.memo(SegmentedBarItem);
