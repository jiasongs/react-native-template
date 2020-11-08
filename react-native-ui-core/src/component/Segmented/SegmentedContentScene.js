'use strict';
import React, { useMemo, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

function SegmentedContentScene(props) {
  const {
    style,
    children,
    contentLayout,
    active,
    forwardedRef,
    ...others
  } = props;

  const [focused, setFocused] = useState(active);

  useEffect(() => {
    if (!focused) {
      setFocused(active);
    }
  }, [active, focused]);

  const buildStyles = useMemo(() => {
    const childStyle = children && children.props ? children.props.style : null;
    return {
      style: [
        styles.container,
        style,
        childStyle,
        { width: contentLayout.width },
      ],
    };
  }, [children, contentLayout.width, style]);

  return (
    <View ref={forwardedRef} style={buildStyles.style} {...others}>
      {focused ? children : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

SegmentedContentScene.propTypes = {};

SegmentedContentScene.defaultProps = {};

const MemoContentScene = React.memo(SegmentedContentScene);
const ForwardMemoContentScene = React.forwardRef((props, ref) => {
  return <MemoContentScene forwardedRef={ref} {...props} />;
});

ForwardMemoContentScene.displayName = 'RCTView';

export default ForwardMemoContentScene;
