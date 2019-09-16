'use strict';
import React, { useMemo, useContext } from 'react';
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../config/theme';

function Badge(props) {
  const { style, type, count, countStyle, maxCount } = props;
  const themeValue = useContext(ThemeContext);

  const buildStyles = useMemo(() => {
    const badge = themeValue.badge;
    const newStyle = [styles.container],
      newCountStyle = [styles.countStyle];
    switch (type) {
      case 'capsule':
        newStyle.push(badge.capsule.style);
        newCountStyle.push(badge.capsule.countStyle);
        break;
      case 'square':
        newStyle.push(badge.square.style);
        newCountStyle.push(badge.square.countStyle);
        break;
      case 'dot':
        newStyle.push(badge.dot.style);
        newCountStyle.push(badge.dot.countStyle);
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
        <Text style={buildStyles.countStyle}>
          {parseInt(count) > maxCount ? `${maxCount}+` : count}
        </Text>
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
  countStyle: Text.propTypes.style,
  maxCount: PropTypes.number,
};

Badge.defaultProps = {
  type: 'capsule',
  maxCount: 99,
};

export default React.memo(Badge);
