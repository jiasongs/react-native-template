'use strict';
import React from 'react';
import { RefreshControl } from 'react-native';
import PropTypes from 'prop-types';

function ListHeaderLoading(props) {
  const { isRefreshing, onRefresh, ...others } = props;

  return (
    <RefreshControl
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      {...others}
    />
  );
}

ListHeaderLoading.propTypes = {
  isRefreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
  colors: PropTypes.array,
  progressBackgroundColor: PropTypes.string,
  size: PropTypes.any,
  tintColor: PropTypes.string,
  title: PropTypes.string,
  progressViewOffset: PropTypes.number,
};

ListHeaderLoading.defaultProps = {
  isRefreshing: false,
};

export default React.memo(ListHeaderLoading);
