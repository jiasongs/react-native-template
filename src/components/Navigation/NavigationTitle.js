'use strict';
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Theme } from '../../config/themes';

function NavigationTitle(props) {
  const {
    style,
    title,
    titleStyle,
    extraData,
    leftActionWidth,
    rightActionWidth,
  } = props;

  function buildRenderContent() {
    if (typeof title === 'string') {
      return (
        <Text
          style={[styles.title, titleStyle]}
          numberOfLines={1}
          ellipsizeMode={'middle'}
          extraData={extraData}
        >
          {title}
        </Text>
      );
    } else if (typeof title === 'function') {
      return title();
    } else if (React.isValidElement(title)) {
      return title;
    }
    return null;
  }

  function buildStyle() {
    const maxWidth = Math.max(leftActionWidth, rightActionWidth) + 3 * 2;
    return { width: Theme.screenWidth - maxWidth * 2 };
  }

  const RenderContent = useMemo(buildRenderContent, [
    title,
    titleStyle,
    extraData,
  ]);
  const defaultStyle = useMemo(buildStyle, [leftActionWidth, rightActionWidth]);

  return <View style={[defaultStyle, style]}>{RenderContent}</View>;
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: Theme.navBarTitleColor,
    fontSize: Theme.navBarTitleFontSize,
  },
});

NavigationTitle.propTypes = {
  style: ViewPropTypes.style,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
  ]),
  titleStyle: Text.propTypes.style,
  leftActionWidth: PropTypes.number,
  rightActionWidth: PropTypes.number,
  extraData: PropTypes.any,
};

NavigationTitle.defaultProps = {
  leftActionWidth: 10,
  rightActionWidth: 10,
};

export default React.memo(NavigationTitle);
