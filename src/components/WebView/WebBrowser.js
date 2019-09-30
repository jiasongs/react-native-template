'use strict';
import React, { useRef, useMemo, useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import Webview from 'react-native-webview';
import PageContainer from '../Container/PageContainer';
import NavigationBar from '../Navigation/NavigationBar';
import { useBackHandler } from '../../common/hooks';
import RouterHelper from '../../routers/RouterHelper';

const State = {
  canGoBack: false,
  canGoForward: false,
  loading: false,
  navigationType: 'other',
  target: 0,
  title: '',
  url: '',
};

function WebBrowser(props) {
  const {
    style,
    source,
    onLoadStart,
    onLoadEnd,
    onNavigationStateChange,
    forwardedRef,
    ...others
  } = props;
  const webViewRef = useRef();
  const navStateRef = useRef(State);
  const [navState, setNavState] = useState({ loading: false, title: '' });

  useBackHandler(() => {
    if (navStateRef.current.canGoBack) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  });

  const onBack = useCallback(() => {
    if (navStateRef.current.canGoBack) {
      webViewRef.current.goBack();
    } else {
      RouterHelper.goBack();
    }
  }, []);

  const onReload = useCallback(() => {
    webViewRef.current.reload();
  }, []);

  const onClose = useCallback(() => {
    RouterHelper.goBack();
  }, []);

  const onNavStateChange = useCallback(
    (state) => {
      navStateRef.current = state;
      onNavigationStateChange && onNavigationStateChange(state);
    },
    [onNavigationStateChange],
  );

  const onLoadStartBack = useCallback(
    (event) => {
      const state = event.nativeEvent;
      navStateRef.current = state;
      setNavState({ title: state.title, loading: state.loading });
      onLoadStart && onLoadStart(event);
    },
    [onLoadStart],
  );

  const onLoadEndBack = useCallback(
    (event) => {
      const state = event.nativeEvent;
      navStateRef.current = state;
      setNavState({ title: state.title, loading: state.loading });
      onLoadEnd && onLoadEnd(event);
    },
    [onLoadEnd],
  );

  const buildStyles = useMemo(() => {
    return {
      style: [styles.webStyle, style],
    };
  }, [style]);

  return (
    <PageContainer loading={navState.loading}>
      <NavigationBar
        title={navState.title}
        onPressBack={onBack}
        renderRightAction={[
          { title: '刷新', onPress: onReload },
          { title: '关闭', onPress: onClose },
        ]}
      />
      <Webview
        {...others}
        ref={webViewRef}
        style={buildStyles.style}
        source={source}
        onLoadStart={onLoadStartBack}
        onLoadEnd={onLoadEndBack}
        onNavigationStateChange={onNavStateChange}
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  webStyle: {
    flex: 1,
  },
});

WebBrowser.propTypes = {};

WebBrowser.defaultProps = {};

const MemoWebBrowser = React.memo(WebBrowser);
const ForwardWebBrowser = React.forwardRef((props, ref) => {
  return <MemoWebBrowser {...props} forwardedRef={ref} />;
});

ForwardWebBrowser.propTypes = WebBrowser.propTypes;
ForwardWebBrowser.defaultProps = WebBrowser.defaultProps;
ForwardWebBrowser.displayName = 'WebBrowser';

export default ForwardWebBrowser;
