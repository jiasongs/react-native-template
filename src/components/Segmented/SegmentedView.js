'use strict';
import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  Platform,
  ViewPagerAndroid,
} from 'react-native';
import PropTypes from 'prop-types';
import SegmentedBar from './SegmentedBar';
import SceneView from './SceneView';

function ContentView(props) {
  const { children, onScroll, onLayout, layout } = props;

  return (
    <Animated.ScrollView
      onLayout={onLayout}
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={true}
      scrollEventThrottle={16}
      onScroll={onScroll}
    >
      {React.Children.map(children, (item, index) => {
        return (
          <SceneView key={`page_${item.key || index}`} layout={layout}>
            {item}
          </SceneView>
        );
      })}
    </Animated.ScrollView>
  );
}

function SegmentedView(props) {
  const { children } = props;

  const animatedXRef = useRef(new Animated.Value(0));
  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const onLayout = useCallback((event) => {
    setLayout(event.nativeEvent.layout);
  }, []);

  const onScroll = useCallback(
    (event) => {
      const { contentOffset } = event.nativeEvent;
      const index = Math.round(contentOffset.x / layout.width);
      if (index !== currentIndex) {
        setCurrentIndex(index);
      }
    },
    [currentIndex, layout.width],
  );

  return (
    <View style={styles.container}>
      <SegmentedBar
        animatedX={animatedXRef.current}
        contentLayout={layout}
        sceneChildren={children}
        currentIndex={currentIndex}
      />
      <ContentView
        layout={layout}
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
