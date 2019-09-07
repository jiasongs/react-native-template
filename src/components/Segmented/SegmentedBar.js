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

  const itemSumWidthRef = useRef(0);
  const itemLayoutsRef = useRef([]);
  const scrollViewRef = useRef(React.createRef());

  const [interpolateX, setInterpolateX] = useState({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const [interpolateScaleX, setInterpolateScaleX] = useState({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const [itemLayouts, setItemLayouts] = useState([]);
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const onLayout = useCallback((event) => {
    setLayout(event.nativeEvent.layout);
  }, []);

  console.log('contentSize', contentSize);
  useEffect(() => {
    const temp = 685;
    const listener = animatedX.addListener(({ value }) => {
      const z = value * (temp / (375 * sceneChildren.length));
      console.log('value', value);
      if (z < 375 / 2) {
        return;
      }
      const xxxx = z - 375 / 2;
      scrollViewRef.current.scrollTo({
        x: xxxx,
        y: 0,
        animated: false,
      });
    });
    return () => listener.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onItemLayout = useCallback(
    (event, index) => {
      const length = Array.isArray(sceneChildren) ? sceneChildren.length : 1;
      if (event.nativeEvent.layout) {
        itemLayoutsRef.current[index] = event.nativeEvent.layout;
        const temp = itemLayoutsRef.current.filter((item) => item);
        if (temp.length === length) {
          setItemLayouts(itemLayoutsRef.current);
        }
      }
    },
    [sceneChildren],
  );

  useEffect(() => {
    const length = Array.isArray(sceneChildren) ? sceneChildren.length : 1;
    const temp = itemLayouts.filter((item) => item);
    console.log('itemLayoutsRef.current', itemLayoutsRef.current);
    if (
      temp.length === length &&
      contentLayout.width !== 0 &&
      contentSize.width !== 0
    ) {
      let inputRange = [],
        outputRange = [],
        outputRange2 = [],
        preWidth = 0;
      const itemw = contentSize.width / length;
      itemLayoutsRef.current.forEach((item, ii) => {
        const currentLayout = itemLayoutsRef.current[ii];
        inputRange.push(contentLayout.width * ii);
        const sc = currentLayout.width / itemw; // 缩放倍数
        const transformx = (itemw * (1 - sc)) / 2;
        console.log('sc', sc);
        console.log('width', currentLayout.width);
        console.log('itemw', contentLayout.width, length);
        console.log('transformx', transformx);
        outputRange.push(currentLayout.x - transformx);
        outputRange2.push(currentLayout.width / itemw);
        preWidth = currentLayout.width;
      }, []);
      console.log(inputRange);
      console.log(outputRange);
      console.log(itemw, outputRange2);
      setInterpolateX({ inputRange, outputRange });
      setInterpolateScaleX({ inputRange, outputRange: outputRange2 });
    }
    console.log('ContentSize', contentLayout.width);
  }, [contentLayout, contentSize, itemLayouts, sceneChildren]);

  const onContentSizeChange = useCallback((width, height) => {
    setContentSize({ width, height });
    console.log('ContentSize', width);
  }, []);

  const buildStyles = useMemo(() => {
    const length = Array.isArray(sceneChildren) ? sceneChildren.length : 1;
    const itemw = contentSize.width / length;
    const currentLayout = itemLayoutsRef.current[currentIndex];
    console.log('currentLayout', currentLayout);
    const transform = {
      transform: [
        {
          translateX: animatedX.interpolate(interpolateX),
        },
        {
          scaleX: animatedX.interpolate(interpolateScaleX),
        },
      ],
    };
    return {
      indicatorStyle: [styles.indicatorStyle, transform, { width: itemw }],
    };
  }, [
    animatedX,
    contentSize.width,
    currentIndex,
    interpolateScaleX,
    interpolateX,
    sceneChildren,
  ]);

  return (
    <View style={styles.container} onLayout={onLayout}>
      <ScrollView
        ref={scrollViewRef}
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
