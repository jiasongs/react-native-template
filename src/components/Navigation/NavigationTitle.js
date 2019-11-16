'use strict';
import React, { useMemo } from 'react';
import { View, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Label } from '../Text';
import { RenderNode } from '../Helpers';

function NavigationTitle(props) {
  const {
    style,
    title,
    titleStyle,
    extraData,
    containerWidth,
    leftActionWidth,
    rightActionWidth,
  } = props;

  const buildStyles = useMemo(() => {
    const widthLR = Math.max(leftActionWidth, rightActionWidth);
    return {
      style: [{ width: containerWidth - widthLR * 2 }, style],
    };
  }, [containerWidth, leftActionWidth, rightActionWidth, style]);

  return (
    <View style={[buildStyles.style]}>
      <RenderNode
        Component={Label}
        Node={title}
        style={[styles.title, titleStyle]}
        title={title}
        numberOfLines={1}
        ellipsizeMode={'middle'}
        extraData={extraData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
});

NavigationTitle.propTypes = {
  style: ViewPropTypes.style,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
  ]),
  titleStyle: Label.propTypes.style,
  leftActionWidth: PropTypes.number,
  rightActionWidth: PropTypes.number,
  extraData: PropTypes.any,
};

NavigationTitle.defaultProps = {
  leftActionWidth: 10,
  rightActionWidth: 10,
};

export default React.memo(NavigationTitle);
