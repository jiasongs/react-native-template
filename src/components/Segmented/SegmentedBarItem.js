'use strict';
import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../Touchable/Button';

function SegmentedBarItem(props) {
  const { title, index, onLayout } = props;

  const onLayoutBack = useCallback(
    (event) => {
      onLayout && onLayout(event, index);
    },
    [index, onLayout],
  );

  return (
    <View style={styles.container} onLayout={onLayoutBack}>
      <Button
        type={'clear'}
        style={{ backgroundColor: 'blue' }}
        title={title}
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
    // borderRightWidth: StyleSheet.hairlineWidth,
  },
});

SegmentedBarItem.propTypes = {};

SegmentedBarItem.defaultProps = {};

export default React.memo(SegmentedBarItem);
