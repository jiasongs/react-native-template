'use strict';
import React, { useMemo } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button } from '../Touchable';
import { Predefine } from '../../config/predefine';
import { useTheme } from '../../config/theme';
import ImageView from '../Image/ImageView';

function Card(props) {
  const { style } = props;

  const themeValue = useTheme();

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
    >
      <ImageView />
      <Text>title</Text>
      <Text>subTitle</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {},
});

Card.propTypes = {};

Card.defaultProps = {};

export default React.memo(Card);
