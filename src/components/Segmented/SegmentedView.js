'use strict';
import React, { useRef, useState, useCallback } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import SegmentedBar from './SegmentedBar';
import SceneView from './SceneView';

function ContentView(props) {
  const { children, onScroll, onLayout, contentLayout } = props;

  return (
    <Animated.ScrollView
      onLayout={onLayout}
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={true}
      scrollEventThrottle={1}
      onScroll={onScroll}
    >
      {React.Children.map(children, (item, index) => {
        return (
          <SceneView
            key={`page_${item.key || index}`}
            contentLayout={contentLayout}
          >
            {item}
          </SceneView>
        );
      })}
    </Animated.ScrollView>
  );
}

function SegmentedView(props) {
  const { children, barStyle, indicatorStyle } = props;

  const animatedXRef = useRef(new Animated.Value(0));
  const [contentLayout, setContentLayout] = useState({ width: 0, height: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const onLayout = useCallback((event) => {
    setContentLayout(event.nativeEvent.layout);
  }, []);

  const onScroll = useCallback(
    (event) => {
      const { contentOffset } = event.nativeEvent;
      const index = Math.round(contentOffset.x / contentLayout.width);
      if (index !== currentIndex) {
        setCurrentIndex(index);
      }
    },
    [contentLayout.width, currentIndex],
  );

  return (
    <View style={styles.container}>
      <SegmentedBar
        animatedX={animatedXRef.current}
        sceneChildren={children}
        currentIndex={currentIndex}
        style={barStyle}
        indicatorStyle={indicatorStyle}
      />
      <ContentView
        contentLayout={contentLayout}
        onLayout={onLayout}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: animatedXRef.current } } }],
          { useNativeDriver: true, listener: onScroll },
        )}
      >
        {children}
      </ContentView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

SegmentedView.propTypes = {};

SegmentedView.defaultProps = {};

const MemoSegmentedView = React.memo(SegmentedView);

MemoSegmentedView.Scene = function(props) {
  return props.children;
};

export default MemoSegmentedView;
