'use strict';
import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, ViewPropTypes, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import Button from '../Touchable/Button';

function SegmentedBarItem(props) {
  const {
    index,
    onBoxLayout,
    onItemLayout,
    children,
    onPress,
    active,
    style,
    activeStyle,
    titleStyle,
    activeTitleStyle,
    iconStyle,
    activeIconStyle,
    ...others
  } = props;

  const onBoxLayoutBack = useCallback(
    (event) => {
      onBoxLayout && onBoxLayout(event, index);
    },
    [index, onBoxLayout],
  );

  const onItemLayoutBack = useCallback(
    (event) => {
      onItemLayout && onItemLayout(event, index);
    },
    [index, onItemLayout],
  );

  const onPressBack = useCallback(() => {
    onPress && onPress(index);
  }, [index, onPress]);

  const buildStyles = useMemo(() => {
    const newStyle = [styles.normalStyle, style];
    const newTitleStyle = [styles.normalTitleStyle, titleStyle];
    const newIconStyle = [styles.normalIconStyle, iconStyle];
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
    iconStyle,
    style,
    titleStyle,
  ]);

  return (
    <View style={styles.container} onLayout={onBoxLayoutBack}>
      <Button
        {...others}
        onLayout={onItemLayoutBack}
        style={buildStyles.style}
        titleStyle={buildStyles.titleStyle}
        iconStyle={buildStyles.iconStyle}
        type={'clear'}
        onPress={onPressBack}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  normalStyle: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  activeStyle: {},
  normalTitleStyle: {},
  activeTitleSyle: {
    color: 'blue',
  },
  normalIconStyle: {},
  activeIconSyle: {
    tintColor: 'blue',
  },
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
