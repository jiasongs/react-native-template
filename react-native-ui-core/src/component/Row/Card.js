'use strict';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '../Touchable';
import { Predefine } from '../../common/predefine';
import { useTheme } from '../Theme';
import { ImageView } from '../Image';
import { Label } from '../Text';

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
      <Label>title</Label>
      <Label>subTitle</Label>
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {},
});

Card.propTypes = {};

Card.defaultProps = {};

export default React.memo(Card);
