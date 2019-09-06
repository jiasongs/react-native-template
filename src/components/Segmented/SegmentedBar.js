'use strict';
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
} from 'react-native';
import SegmentedBarItem from './SegmentedBarItem';

function Indicator(props) {
  const { style } = props;

  return <Animated.View style={style}></Animated.View>;
}

function SegmentedBar(props) {
  const { animatedX, sceneChildren, contentLayout, currentIndex } = props;

  const itemLayoutsRef = useRef([]);

  const [contentSize, setContentSize] = useState({ width: 1, height: 1 });
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const onLayout = useCallback((event) => {
    setLayout(event.nativeEvent.layout);
  }, []);

  const onItemLayout = useCallback((event, index) => {
    itemLayoutsRef.current[index] = event.nativeEvent.layout;
  }, []);

  const onContentSizeChange = useCallback((width, height) => {
    setContentSize({ width, height });
    console.log('ContentSize', width);
  }, []);

  const buildStyles = useMemo(() => {
    const length = Array.isArray(sceneChildren) ? sceneChildren.length : 1;
    let inputRange = [0],
      outputRange = [0],
      outputRange2 = [1],
      preWidth = 0;
    itemLayoutsRef.current.forEach((item, index) => {
      const itemw = contentSize.width / length;
      const currentLayout = itemLayoutsRef.current[index + 1];
      console.log('currentLayout', currentLayout);
      inputRange.push(contentLayout.width * (index + 1));
      outputRange.push(currentLayout ? currentLayout.x : 0);
      console.log('z', currentLayout ? currentLayout.width : 0);
      outputRange2.push((currentLayout ? currentLayout.width : 0) / itemw);
    }, []);
    if (inputRange.length === 1) {
      inputRange = [0, 1];
      outputRange = [0, 1];
      outputRange2 = [0, 1];
    }
    console.log('inputRange', inputRange);
    console.log('outputRange', outputRange);
    console.log('outputRange2', outputRange2);
    const transform = {
      transform: [
        {
          translateX: animatedX.interpolate({
            inputRange: inputRange,
            outputRange: outputRange,
          }),
        },
        {
          scaleX: animatedX.interpolate({
            inputRange: inputRange,
            outputRange: outputRange2,
          }),
        },
      ],
    };
    console.log('currentIndex', currentIndex);
    const currentLayout = itemLayoutsRef.current[currentIndex];
    console.log('currentLayout', currentLayout);
    return {
      indicatorStyle: [
        styles.indicatorStyle,
        transform,
        { width: contentSize ? contentSize.width / length : 0 },
      ],
    };
  }, [animatedX, contentLayout, contentSize, currentIndex, sceneChildren]);

  // useEffect(() => {
  //   LayoutAnimation.configureNext({
  //     duration: 500,
  //     update: {
  //       duration: 500,
  //       property: LayoutAnimation.Properties.scaleXY,
  //       type: LayoutAnimation.Types.linear,
  //     },
  //   });
  // }, [currentIndex]);

  return (
    <View style={styles.container} onLayout={onLayout}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.contentContainerStyle}
        onContentSizeChange={onContentSizeChange}
      >
        {React.Children.map(sceneChildren, (item, index) => {
          return (
            <SegmentedBarItem
              {...item.props}
              index={index}
              onLayout={onItemLayout}
            />
          );
        })}
        <Indicator style={buildStyles.indicatorStyle} animatedX={animatedX} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  indicatorStyle: {
    position: 'absolute',
    bottom: 0,
    height: 10,
    backgroundColor: 'red',
  },
});

SegmentedBar.propTypes = {};

SegmentedBar.defaultProps = {};

export default React.memo(SegmentedBar);
