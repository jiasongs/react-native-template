'use strict';
import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

function SceneView(props) {
  const { children, contentLayout } = props;

  const buildStyles = useMemo(() => {
    const propsStyle = children.props.style;
    return {
      style: [styles.container, propsStyle, { width: contentLayout.width }],
    };
  }, [children, contentLayout]);

  return <View style={buildStyles.style}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

SceneView.propTypes = {};

SceneView.defaultProps = {};

export default React.memo(SceneView);
