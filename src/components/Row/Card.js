'use strict';
import React, { useContext, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../Touchable/Button';
import { Predefine } from '../../config/predefine';
import { ThemeContext } from '../../config/theme';

function Card(props) {
  const { style } = props;

  const themeValue = useContext(ThemeContext);

  const buildStyles = useMemo(() => {
    const listRow = themeValue.listRow;
    return {
      style: [listRow.style, styles.container, style],
    };
  }, [style, themeValue]);

  return (
    <Button
      hitSlop={Predefine.InsetZero}
      type={'clear'}
      style={buildStyles.style}
      onPress={() => {}}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
});

Card.propTypes = {};

Card.defaultProps = {};

export default React.memo(Card);
