'use strict';
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { Animated, View, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import SegmentedBarItem from './SegmentedBarItem';

function Indicator(props) {
  const { style } = props;

  return <Animated.View style={style} />;
}

function RenderAction(props) {
  const { action } = props;
  if (typeof action === 'function') {
    return action();
  } else if (React.isValidElement(action)) {
    return action;
  }
  return null;
}

const MemoRenderAction = React.memo(RenderAction);
const MemoIndicator = React.memo(Indicator);

function SegmentedBar(props) {
  const {
    type,
    style,
    animatedX,
    sceneChildren,
    currentIndex,
    indicatorStyle,
    onPressItem,
    barActionPosition,
    barAction,
    contentLayout,
  } = props;

  const scrollViewRef = useRef(React.createRef());
  const preSceneChildrenLength = useRef(0);

  const [interpolate, setInterpolate] = useState({
    inputRangeX: [0, 0],
    outputRangeX: [0, 0],
    inputRangeScale: [0, 0],
    outputRangeScale: [0, 0],
  });
  const [scrollLayout, setScrollLayout] = useState({ width: 0, height: 0 });
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
      return 80;
    }
  }, [indicatorStyle, type]);

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
      style: [styles.container, style],
      indicatorStyle: [...newIndicatorStyle, indicatorStyle, transform],
      contentContainerStyle: [styles.contentContainerStyle],
    };
  }, [animatedX, contentItemWidth, indicatorStyle, interpolate, style]);

  useEffect(() => {
    let boxLayout = boxLayouts[currentIndex];
    boxLayout = boxLayout ? boxLayout : { x: 0, width: 0 };
    const offsetX = boxLayout.x - scrollLayout.width / 2 + boxLayout.width / 2;
    if (offsetX) {
      scrollViewRef.current._component.scrollTo({
        x: offsetX,
        y: 0,
        animated: true,
      });
    }
  }, [scrollLayout, currentIndex, boxLayouts]);

  useEffect(() => {
    const length = Array.isArray(sceneChildren) ? sceneChildren.length : 1;
    const boxLength = boxLayouts.filter((item) => item).length;
    const itemLength = itemLayouts.filter((item) => item).length;
    if (
      type !== 'none' &&
      boxLength >= length &&
      itemLength >= length &&
      contentLayout.width !== 0 &&
      contentItemWidth !== 0
    ) {
      preSceneChildrenLength.current = length;
      let inputRange = [],
        outputRangeX = [],
        outputRangeScale = [];
      React.Children.forEach(sceneChildren, (item, ii) => {
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
        console.log('layoutX', layoutX, transformx);
        inputRange.push(contentLayout.width * ii);
        outputRangeX.push(Math.round(layoutX - transformx));
        outputRangeScale.push(multiple);
      });
      console.log('inputRangeX', inputRange);
      console.log('outputRangeX', outputRangeX);
      console.log('outputRangeScale', outputRangeScale);
      setInterpolate({
        inputRangeX: inputRange,
        outputRangeX: outputRangeX,
        inputRangeScale: inputRange,
        outputRangeScale: outputRangeScale,
      });
    }
  }, [
    boxLayouts,
    itemLayouts,
    contentItemWidth,
    contentLayout,
    sceneChildren,
    type,
  ]);

  const onContentSizeChange = useCallback((width, height) => {
    setContentSize({ width, height });
    console.log('onContentSizeChange');
    // if (!isHandleContentSizeRef.current) {
    //   isHandleContentSizeRef.current = true;
    // } else {
    //   console.warn(
    //     'Bar的子控件布局引发变动，同时正在滑动，此时会导致性能问题，给itemStyle设置一个宽度即可解决',
    //   );
    // }
  }, []);

  const onLayout = useCallback((event) => {
    setScrollLayout(event.nativeEvent.layout);
    console.log('onLayout');
    // if (!isHandleContentLayoutRef.current) {
    //   isHandleContentLayoutRef.current = true;

    // }
  }, []);

  const onBoxLayout = useCallback(
    (event, index) => {
      const length = Array.isArray(sceneChildren) ? sceneChildren.length : 1;
      const layout = event.nativeEvent.layout;
      const boxLayout = boxLayouts[index];
      if (!layout) {
        return;
      }
      boxLayouts[index] = layout;
      if (boxLayout) {
        if (Math.round(boxLayout.width) !== Math.round(layout.width)) {
          setBoxLayouts(boxLayouts.slice());
          console.log('boxLayouts22222');
        }
      } else {
        const layoutLength = boxLayouts.filter((item) => item).length;
        if (layoutLength === length) {
          setBoxLayouts(boxLayouts.slice());
          console.log('boxLayouts1111');
        }
      }
    },
    [boxLayouts, sceneChildren],
  );

  const onItemLayout = useCallback(
    (event, index) => {
      const length = Array.isArray(sceneChildren) ? sceneChildren.length : 1;
      const layout = event.nativeEvent.layout;
      const itemLayout = itemLayouts[index];
      if (!layout) {
        return;
      }
      itemLayouts[index] = layout;
      if (itemLayout) {
        if (Math.round(itemLayout.width) !== Math.round(layout.width)) {
          setItemLayouts(itemLayouts.slice());
          console.log('itemLayoutss2222');
        }
      } else {
        const layoutLength = itemLayouts.filter((item) => item).length;
        if (layoutLength === length) {
          setItemLayouts(itemLayouts.slice());
          console.log('itemLayoutss111');
        }
      }
      // if (layoutLength === length && !isHandleItemLayoutsRef.current) {
      //   isHandleItemLayoutsRef.current = true;
      //   setItemLayouts(itemLayouts.slice());
      // }
    },
    [itemLayouts, sceneChildren],
  );

  return (
    <View style={buildStyles.style}>
      {barActionPosition === 'left' ? (
        <MemoRenderAction action={barAction} />
      ) : null}
      <Animated.ScrollView
        ref={scrollViewRef}
        onLayout={onLayout}
        horizontal={true}
        contentContainerStyle={buildStyles.contentContainerStyle}
        onContentSizeChange={onContentSizeChange}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
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
              delete newItemProps[key];
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
      </Animated.ScrollView>
      {barActionPosition === 'right' ? (
        <MemoRenderAction action={barAction} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
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
  barActionPosition: PropTypes.oneOf(['left', 'right']),
  barAction: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  animatedX: PropTypes.any,
  sceneChildren: PropTypes.any,
  currentIndex: PropTypes.number,
  onPressItem: PropTypes.func,
};

SegmentedBar.defaultProps = {
  type: 'box',
  barActionPosition: 'right',
};

export default React.memo(SegmentedBar);
