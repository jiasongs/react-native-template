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
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import SegmentedBarItem from './SegmentedBarItem';

function Indicator(props) {
  const { style } = props;

  return <Animated.View style={style} />;
}

const MemoIndicator = React.memo(Indicator);

function SegmentedBar(props) {
  const {
    type,
    animatedX,
    sceneChildren,
    currentIndex,
    indicatorStyle,
    onPressItem,
    ...others
  } = props;

  const scrollViewRef = useRef(React.createRef());
  const isHandleContentLayoutRef = useRef(false);
  const isHandleContentSizeRef = useRef(false);
  const isHandleBoxLayoutsRef = useRef(false);
  const isHandleItemLayoutsRef = useRef(false);

  const [interpolate, setInterpolate] = useState({
    inputRangeX: [0, 0],
    outputRangeX: [0, 0],
    inputRangeScale: [0, 0],
    outputRangeScale: [0, 0],
  });
  const [contentLayout, setContentLayout] = useState({ width: 0, height: 0 });
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });
  const [boxLayouts, setBoxLayouts] = useState([]);
  const [itemLayouts, setItemLayouts] = useState([]);

  const contentItemWidth = useMemo(() => {
    if (type === 'custom') {
      const flattenStyle = StyleSheet.flatten(
        indicatorStyle ? indicatorStyle : { width: 0 },
      );
      if (!flattenStyle.width) {
        console.error('当类型为customWidth时，style必须设置宽度');
      }
      return flattenStyle.width;
    } else {
      const length = Array.isArray(sceneChildren) ? sceneChildren.length : 1;
      return contentSize.width / length;
    }
  }, [contentSize, indicatorStyle, sceneChildren, type]);

  const buildStyles = useMemo(() => {
    const newIndicatorStyle = [styles.indicatorStyle];
    const transform = {
      transform: [
        {
          translateX: animatedX.interpolate({
            inputRange: interpolate.inputRangeX,
            outputRange: interpolate.outputRangeX,
          }),
        },
        {
          scaleX: animatedX.interpolate({
            inputRange: interpolate.inputRangeScale,
            outputRange: interpolate.outputRangeScale,
          }),
        },
      ],
    };
    newIndicatorStyle.push({ width: contentItemWidth });
    return {
      indicatorStyle: [...newIndicatorStyle, indicatorStyle, transform],
      contentContainerStyle: [styles.contentContainerStyle],
    };
  }, [animatedX, contentItemWidth, indicatorStyle, interpolate]);

  useEffect(() => {
    let itemLayout = boxLayouts[currentIndex];
    itemLayout = itemLayout ? itemLayout : { x: 0, width: 0 };
    const offsetX =
      itemLayout.x - contentLayout.width / 2 + itemLayout.width / 2;
    if (offsetX) {
      scrollViewRef.current.scrollTo({
        x: offsetX,
        y: 0,
        animated: true,
      });
    }
  }, [contentLayout, currentIndex, boxLayouts]);

  useEffect(() => {
    const length = Array.isArray(sceneChildren) ? sceneChildren.length : 1;
    const boxLength = boxLayouts.filter((item) => item).length;
    const itemLength = itemLayouts.filter((item) => item).length;
    if (
      type !== 'none' &&
      boxLength === length &&
      itemLength === length &&
      contentLayout.width !== 0 &&
      contentSize.width !== 0
    ) {
      let inputRange = [],
        outputRangeX = [],
        outputRangeScale = [];
      boxLayouts.forEach((item, ii) => {
        let currentLayout = {};
        let layoutX = 0;
        const boxLayout = boxLayouts[ii];
        const itemLayout = itemLayouts[ii];
        if (type === 'box') {
          currentLayout = boxLayout;
          layoutX = boxLayout.x;
        } else if (type === 'item') {
          currentLayout = itemLayout;
          layoutX = boxLayout.x + itemLayout.x;
        } else if (type === 'custom') {
          currentLayout = { width: contentItemWidth };
          layoutX = boxLayout.x + (boxLayout.width - contentItemWidth) / 2;
        }
        const multiple = currentLayout.width / contentItemWidth; // 缩放倍数
        const transformx = (contentItemWidth * (1 - multiple)) / 2;
        inputRange.push(contentLayout.width * ii);
        outputRangeX.push(layoutX - transformx);
        outputRangeScale.push(multiple);
      }, []);
      setInterpolate({
        inputRangeX: inputRange,
        outputRangeX: outputRangeX,
        inputRangeScale: inputRange,
        outputRangeScale: outputRangeScale,
      });
    }
  }, [
    itemLayouts,
    boxLayouts,
    contentItemWidth,
    contentLayout,
    contentSize,
    indicatorStyle,
    sceneChildren,
    type,
  ]);

  const onContentSizeChange = useCallback((width, height) => {
    if (!isHandleContentSizeRef.current) {
      isHandleContentSizeRef.current = true;
      setContentSize({ width, height });
    } else {
      console.warn(
        'Bar的子控件布局引发变动，同时正在滑动，此时会导致性能问题，给itemStyle设置一个宽度即可解决',
      );
    }
  }, []);

  const onLayout = useCallback((event) => {
    if (!isHandleContentLayoutRef.current) {
      isHandleContentLayoutRef.current = true;
      setContentLayout(event.nativeEvent.layout);
    }
  }, []);

  const onBoxLayout = useCallback(
    (event, index) => {
      const length = Array.isArray(sceneChildren) ? sceneChildren.length : 1;
      if (event.nativeEvent.layout) {
        boxLayouts[index] = event.nativeEvent.layout;
        const layoutLength = boxLayouts.filter((item) => item).length;
        if (layoutLength === length && !isHandleBoxLayoutsRef.current) {
          isHandleBoxLayoutsRef.current = true;
          setBoxLayouts(boxLayouts.slice());
        }
      }
    },
    [boxLayouts, sceneChildren],
  );

  const onItemLayout = useCallback(
    (event, index) => {
      const length = Array.isArray(sceneChildren) ? sceneChildren.length : 1;
      if (event.nativeEvent.layout) {
        itemLayouts[index] = event.nativeEvent.layout;
        const layoutLength = itemLayouts.filter((item) => item).length;
        if (layoutLength === length && !isHandleItemLayoutsRef.current) {
          isHandleItemLayoutsRef.current = true;
          setItemLayouts(itemLayouts.slice());
        }
      }
    },
    [itemLayouts, sceneChildren],
  );

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        onLayout={onLayout}
        horizontal={true}
        contentContainerStyle={buildStyles.contentContainerStyle}
        onContentSizeChange={onContentSizeChange}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {React.Children.map(sceneChildren, (item, index) => {
          const itemProps = item.props ? item.props : {};
          const newItemProps = { ...itemProps };
          let key;
          for (key in props) {
            if (key.indexOf('item') !== -1 && !itemProps[key]) {
              newItemProps[key] = props[key];
            }
          }
          for (key in newItemProps) {
            let newKey = key.slice();
            const value = newItemProps[key];
            if (key.indexOf('item') !== -1) {
              newKey = key.slice(4);
              const firstChar = newKey.charAt(0);
              newKey = newKey.replace(firstChar, firstChar.toLowerCase());
            }
            newItemProps[newKey] = value;
          }
          return (
            <SegmentedBarItem
              index={index}
              onBoxLayout={onBoxLayout}
              onItemLayout={onItemLayout}
              onPress={onPressItem}
              active={index === currentIndex}
              {...newItemProps}
            />
          );
        })}
        <MemoIndicator
          style={buildStyles.indicatorStyle}
          animatedX={animatedX}
        />
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
    height: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
});

SegmentedBar.propTypes = {
  ...SegmentedBarItem.type.propTypes,
  type: PropTypes.oneOf(['none', 'box', 'item', 'custom']),
  style: ViewPropTypes.style,
  indicatorStyle: ViewPropTypes.style,
  animatedX: PropTypes.any,
  sceneChildren: PropTypes.any,
  currentIndex: PropTypes.number,
  onPressItem: PropTypes.func,
};

SegmentedBar.defaultProps = {
  type: 'box',
};

export default React.memo(SegmentedBar);
