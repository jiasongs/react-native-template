'use strict';
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Predefine } from '../../config/predefine';

function RenderContent(props) {
  const { title, titleStyle, extraData } = props;
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

function NavigationTitle(props) {
  const {
    style,
    title,
    titleStyle,
    extraData,
    leftActionWidth,
    rightActionWidth,
  } = props;

  const buildStyles = useMemo(() => {
    const widthLR = Math.max(leftActionWidth, rightActionWidth) + 3 * 2;
    return {
      style: [{ width: Predefine.screenWidth - widthLR * 2 }, style],
    };
  }, [leftActionWidth, rightActionWidth, style]);

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
