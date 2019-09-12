'use strict';
import React, { useMemo, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

function SegmentedContentScene(props) {
  const { children, contentLayout, active } = props;

  const [focused, setFocused] = useState(active);

  useEffect(() => {
    if (!focused) {
      console.log('focused', focused);
      setFocused(active);
    }
  }, [active, focused]);

  const buildStyles = useMemo(() => {
    const propsStyle = children && children.props ? children.props.style : null;
    return {
      style: [styles.container, propsStyle, { width: contentLayout.width }],
    };
  }, [children, contentLayout]);

  return <View style={buildStyles.style}>{focused ? children : null}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

SegmentedContentScene.propTypes = {};

SegmentedContentScene.defaultProps = {};

export default React.memo(SegmentedContentScene);
