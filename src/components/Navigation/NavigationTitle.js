'use strict';
import React, { useMemo } from 'react';
import { View, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Label } from '../Text';

function RenderContent(props) {
  const { title, titleStyle, extraData } = props;
  if (typeof title === 'string') {
    return (
      <Label
        style={[styles.title, titleStyle]}
        numberOfLines={1}
        ellipsizeMode={'middle'}
        extraData={extraData}
      >
        {title}
      </Label>
    );
  } else if (typeof title === 'function') {
    return title();
  } else if (React.isValidElement(title)) {
    return title;
  }
  return null;
}

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
      <RenderContent
        title={title}
        titleStyle={titleStyle}
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
