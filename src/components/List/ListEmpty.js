'use strict';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Predefine } from '../../config/predefine';

function ListEmpty(props) {
  const { style, source, title } = props;

  return (
    <View style={[styles.emptyContainer, style]}>
      <Image style={styles.emptyImage} source={source} />
      <Text style={styles.emptyText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    height: Predefine.scaleSize(800),
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: Predefine.scaleSize(22),
    color: '#cdcdcd',
    fontSize: 14,
  },
  emptyImage: {
    width: Predefine.scaleSize(249),
    height: Predefine.scaleSize(249),
  },
});

ListEmpty.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ uri: PropTypes.string }),
  ]),
  title: PropTypes.string,
};

ListEmpty.defaultProps = {
  title: '暂无内容呢~',
};

export default React.memo(ListEmpty);
