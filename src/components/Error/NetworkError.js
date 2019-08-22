'use strict';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Theme } from '../../config/themes';

function NetworkError(props) {
  const { style, onNetworkReload, source } = props;

  return (
    <View style={[styles.container, style]}>
      <Image style={styles.errImage} source={source} />
      <Text style={styles.description}>天呐，网络好像出了点小问题?</Text>
      <TouchableOpacity style={styles.reloadTouch} onPress={onNetworkReload}>
        <Text style={styles.reloadText}>重新连接</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Theme.contentTop,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.pageBackgroundColor,
  },
  errImage: {
    width: 50,
    height: 50
  },
  description: {
    marginTop: 20,
    color: '#cdcdcd',
    fontSize: 12,
  },
  reloadTouch: {
    backgroundColor: Theme.overallColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 17,
    marginTop: 20,
  },
  reloadText: {
    color: '#fff',
    fontSize: 14,
  },
});

NetworkError.propTypes = {
  style: ViewPropTypes.style,
  onNetworkReload: PropTypes.func,
  source: Image.propTypes.source
};

NetworkError.defaultProps = {

};

export default React.memo(NetworkError);
