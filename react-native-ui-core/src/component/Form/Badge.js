'use strict';
import React, { useMemo } from 'react';
import { View, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '../Theme';
import { Label } from '../Text';

function Badge(props) {
  const { style, type, count, countStyle, maxCount } = props;
  const themeValue = useTheme('badge');

  const buildStyles = useMemo(() => {
    const newStyle = [styles.container],
      newCountStyle = [styles.countStyle];
    switch (type) {
      case 'capsule':
        newStyle.push(themeValue.capsule.style);
        newCountStyle.push(themeValue.capsule.countStyle);
        break;
      case 'square':
        newStyle.push(themeValue.square.style);
        newCountStyle.push(themeValue.square.countStyle);
        break;
      case 'dot':
        newStyle.push(themeValue.dot.style);
        newCountStyle.push(themeValue.dot.countStyle);
        break;
      default:
        break;
    }
    return {
      style: [newStyle, style],
      countStyle: [newCountStyle, countStyle],
    };
  }, [countStyle, style, themeValue, type]);

  return (
    <View style={buildStyles.style}>
      {type !== 'dot' ? (
        <Label style={buildStyles.countStyle}>
          {parseInt(count) > maxCount ? `${maxCount}+` : count}
        </Label>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  countStyle: {},
});

Badge.propTypes = {
  ...ViewPropTypes,
  type: PropTypes.oneOf(['capsule', 'square', 'dot']),
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  countStyle: Label.propTypes.style,
  maxCount: PropTypes.number,
};

Badge.defaultProps = {
  type: 'capsule',
  maxCount: 99,
};

export default React.memo(Badge);
