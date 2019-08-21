'use strict';
import React, { useMemo } from 'react';
import { View, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { useNetInfo } from '@react-native-community/netinfo';
import LoadingHint from '../Loading/LoadingHint';
import NetworkError from '../Error/NetworkError';
import { Theme } from '../../config/themes';

const MemoRenderNetworkError = React.memo(RenderNetworkError);
const MemoRenderLoadingHint = React.memo(RenderLoadingHint);

function RenderNetworkError(props) {
  const { style, onNetworkReload, source } = props;
  const netInfo = useNetInfo();
  if (netInfo.type === 'none') {
    return (
      <NetworkError
        style={style}
        source={source}
        onNetworkReload={onNetworkReload}
      />
    );
  }
  return null;
}

function RenderLoadingHint(props) {
  const { style, loading } = props;
  return <LoadingHint style={style} loading={loading} />;
}

function PageContainer(props) {
  const {
    children,
    style,
    emptyStyle,
    showNetworkError,
    networkErrorSource,
    onNetworkReload,
    loading,
    fitNotchedScreen,
    fitNotchedScreenType
  } = props;

  function buildStyles() {
    let notchedScreenStyle;
    if (fitNotchedScreen) {
      if (fitNotchedScreenType === 'padding') {
        notchedScreenStyle = {
          paddingBottom: Theme.isNotchedScreen ? Theme.screenInset.bottom : 0
        };
      } else {
        notchedScreenStyle = {
          marginBottom: Theme.isNotchedScreen ? Theme.screenInset.bottom : 0
        };
      }
    } else {
      notchedScreenStyle = null;
    }
    return { notchedScreenStyle };
  }

  const { notchedScreenStyle } = useMemo(buildStyles, [fitNotchedScreen, fitNotchedScreenType]);

  return (
    <View style={[styles.container, notchedScreenStyle, style]}>
      {children}
      <MemoRenderLoadingHint
        style={emptyStyle}
        loading={loading}
      />
      {showNetworkError && (
        <MemoRenderNetworkError
          style={emptyStyle}
          source={networkErrorSource}
          onNetworkReload={onNetworkReload}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.pageBackgroundColor,
  },
});

PageContainer.propTypes = {
  style: ViewPropTypes.style,
  emptyStyle: ViewPropTypes.style,
  fitNotchedScreen: PropTypes.bool,
  fitNotchedScreenType: PropTypes.oneOf(['padding', 'margin']),
  loading: PropTypes.bool,
  showNetworkError: PropTypes.bool,
  onNetworkReload: PropTypes.func,
  networkErrorSource: NetworkError.type.propTypes.source
};

PageContainer.defaultProps = {
  fitNotchedScreen: true,
  fitNotchedScreenType: 'padding',
  loading: false,
  showNetworkError: true,
};

export default React.memo(PageContainer);



