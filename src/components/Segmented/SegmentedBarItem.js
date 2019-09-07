'use strict';
import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../Touchable/Button';

function SegmentedBarItem(props) {
  const {
    style,
    index,
    onBoxLayout,
    onItemLayout,
    children,
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

  return (
    <View style={styles.container} onLayout={onBoxLayoutBack}>
      <Button
        onLayout={onItemLayoutBack}
        style={{ backgroundColor: 'red' }}
        type={'clear'}
        {...others}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    // borderRightWidth: StyleSheet.hairlineWidth,
  },
});

SegmentedBarItem.propTypes = {};

SegmentedBarItem.defaultProps = {};

export default React.memo(SegmentedBarItem);
