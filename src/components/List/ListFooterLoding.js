'use strict';
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

function RenderAllLoad(props) {
  const { onLayout } = props;
  return (
    <View onLayout={onLayout} style={styles.indicatorContainer}>
      <Text style={styles.footerText}>数据已全部加载完毕</Text>
    </View>
  );
}

function RenderIndicator(props) {
  const { onLayout, loading } = props;
  return (
    <View onLayout={onLayout} style={styles.indicatorContainer}>
      <ActivityIndicator
        animating={loading}
        size="small"
        hidesWhenStopped={true}
        color={'#666'}
      />
      <Text style={styles.footerText}>正在加载...</Text>
    </View>
  );
}

function ListFooterLoding(props) {
  const { loading, allLoad, onLayout } = props;

  if (!loading && allLoad) {
    return <RenderAllLoad />;
  } else if (loading) {
    return <RenderIndicator onLayout={onLayout} loading={loading} />;
  }
  return null;
}

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  footerText: {
    marginLeft: 10,
    fontSize: 13,
    color: '#999999',
  },
});

ListFooterLoding.propTypes = {
  loading: PropTypes.bool,
  allLoad: PropTypes.bool, // 是否加载完毕
};

ListFooterLoding.defaultProps = {
  loading: false,
  allLoad: false,
};

export default React.memo(ListFooterLoding);
