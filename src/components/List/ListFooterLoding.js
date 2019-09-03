'use strict';
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

function RenderFooter(props) {
  const { footer } = props;
  if (React.isValidElement(footer)) {
    return footer;
  } else if (typeof footer === 'function') {
    return footer();
  }
  return null;
}

function RenderLoading(props) {
  const { loading, enable, allLoad } = props;

  const title = useMemo(() => {
    if (loading) {
      return '正在加载...';
    } else if (allLoad) {
      return '数据已全部加载完毕';
    } else {
      return ' ';
    }
  }, [allLoad, loading]);

  if (!enable) {
    return null;
  }

  return (
    <View style={styles.indicatorContainer}>
      <ActivityIndicator
        style={[styles.indicator, { marginRight: loading ? 10 : 0 }]}
        animating={loading}
        size={'small'}
        hidesWhenStopped={true}
        color={'#666'}
      />
      <Text style={styles.footerText}>{title}</Text>
    </View>
  );
}

function ListFooterLoding(props) {
  const { loading, isShowEmpty, allLoad, renderFooter, enable } = props;

  return (
    <View style={[styles.container, { opacity: isShowEmpty ? 0 : 1 }]}>
      <RenderFooter footer={renderFooter} />
      <RenderLoading loading={loading} enable={enable} allLoad={allLoad} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  indicator: {},
  footerText: {
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
