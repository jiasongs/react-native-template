'use strict';
import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { WebBrowser } from '../../components';

function DemoWebBrowser() {
  const webViewRef = useRef(React.createRef());

  return (
    <WebBrowser
      ref={webViewRef}
      style={styles.container}
      source={{ uri: 'https://www.baidu.com/' }}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoWebBrowser);
