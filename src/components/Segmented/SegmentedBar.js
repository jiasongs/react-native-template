'use strict';
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  ViewPropTypes,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import SegmentedBarItem from './SegmentedBarItem';
import { ThemeContext } from '../../config/theme';

function mergeProps(aProps, bProps) {
  const itemProps = aProps ? aProps : {};
  const newItemProps = { ...itemProps };
  let key;
  for (key in bProps) {
    if (key.indexOf('item') !== -1 && !itemProps[key]) {
      newItemProps[key] = bProps[key];
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
  return newItemProps;
}

function RenderIndicator(props) {
  const { style, animatedX, interpolate, contentItemWidth } = props;

  const buildStyles = useMemo(() => {
    const newStyle = [styles.indicatorStyle];
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
    return {
      style: [...newStyle, style, { width: contentItemWidth }, transform],
    };
  }, [animatedX, contentItemWidth, interpolate, style]);

  return <Animated.View style={buildStyles.style} />;
}

function RenderSidebar(props) {
  const { sidebar } = props;
  if (typeof sidebar === 'function') {
    return sidebar();
  } else if (React.isValidElement(sidebar)) {
    return sidebar;
  }
  return null;
}

const MemoRenderSidebar = React.memo(RenderSidebar);
const MemoRenderIndicator = React.memo(RenderIndicator);

function SegmentedBar(props) {
  const {
    indicatorType,
    style,
    animatedX,
    sceneChildren,
    currentIndex,
    indicatorStyle,
    onPressItem,
    sidebarPosition,
    sidebar,
    contentLayout,
    backgroundImage,
  } = props;

  const themeValue = useContext(ThemeContext);
  const scrollViewRef = useRef(React.createRef());
  const boxLayoutsRef = useRef([]);

  const [boxLayouts, setBoxLayouts] = useState([]);
  const [interpolate, setInterpolate] = useState({
    inputRangeX: [0, 0],
    outputRangeX: [0, 0],
    inputRangeScale: [0, 0],
    outputRangeScale: [0, 0],
  });
  const [scrollLayout, setScrollLayout] = useState({ width: 0, height: 0 });

  const contentItemWidth = useMemo(() => {
    if (indicatorType === 'custom') {
      const flattenStyle = StyleSheet.flatten(
        indicatorStyle ? indicatorStyle : {},
      );
      if (!flattenStyle.width) {
        console.error('error: 当类型为custom时，style必须设置宽度');
      }
      return flattenStyle.width || 0;
    } else if (indicatorType === 'none') {
      return 0;
    }
    return 80;
  }, [indicatorStyle, indicatorType]);

  const buildStyles = useMemo(() => {
    const segmentedBar = themeValue.segmented.segmentedBar;
    return {
      style: [segmentedBar.style, styles.container, style],
      indicatorStyle: [segmentedBar.indicatorStyle, indicatorStyle],
      contentContainerStyle: [styles.contentContainerStyle],
    };
  }, [indicatorStyle, style, themeValue]);

  const onLayout = useCallback((event) => {
    setScrollLayout(event.nativeEvent.layout);
  }, []);

  const onBoxLayout = useCallback(
    (event, index) => {
      const layout = event.nativeEvent.layout;
      if (!layout) {
        return;
      }
      const length = Array.isArray(sceneChildren) ? sceneChildren.length : 1;
      const boxLayout = boxLayoutsRef.current[index];
      if (boxLayout) {
        if (Math.round(boxLayout.width) !== Math.round(layout.width)) {
          boxLayoutsRef.current[index] = layout;
          setBoxLayouts(boxLayoutsRef.current.slice());
          console.log('boxLayouts22222');
          console.log('加提示');
        }
      } else {
        boxLayoutsRef.current[index] = layout;
        const layoutLength = boxLayoutsRef.current.filter((item) => item)
          .length;
        if (layoutLength === length) {
          setBoxLayouts(boxLayoutsRef.current.slice());
          console.log('boxLayouts1111');
        }
      }
    },
    [sceneChildren],
  );

  useEffect(() => {
    let boxLayout = boxLayouts[currentIndex];
    boxLayout = boxLayout ? boxLayout : { x: 0, width: 0 };
    const offsetX = boxLayout.x - scrollLayout.width / 2 + boxLayout.width / 2;
    console.log('useEffect', currentIndex);
    if (offsetX) {
      scrollViewRef.current._component.scrollTo({
        x: offsetX,
        y: 0,
        animated: true,
      });
    }
  }, [scrollLayout, currentIndex, boxLayouts, sceneChildren]);

  useEffect(() => {
    const length = Array.isArray(sceneChildren) ? sceneChildren.length : 1;
    const boxLength = boxLayouts.filter((item) => item).length;
    console.log('boxLayouts', boxLength);
    if (
      boxLength >= length &&
      contentLayout.width !== 0 &&
      contentItemWidth !== 0
    ) {
      let inputRange = [],
        outputRangeX = [],
        outputRangeScale = [];
      React.Children.forEach(sceneChildren, (item, ii) => {
        let currentLayout = {};
        let layoutX = 0;
        const boxLayout = boxLayouts[ii];
        console.log('boxLayout', boxLayout);
        if (indicatorType === 'custom') {
          currentLayout = { width: contentItemWidth };
          layoutX = boxLayout.x + (boxLayout.width - contentItemWidth) / 2;
        } else {
          currentLayout = boxLayout;
          layoutX = boxLayout.x;
        }
        const multiple = currentLayout.width / contentItemWidth; // 缩放倍数
        const transformx = (contentItemWidth * (1 - multiple)) / 2;
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
    contentItemWidth,
    contentLayout,
    indicatorType,
    sceneChildren,
  ]);

  return (
    <View style={buildStyles.style}>
      {backgroundImage ? (
        <ImageBackground
          style={StyleSheet.absoluteFill}
          source={backgroundImage}
          resizeMode={'stretch'}
        />
      ) : null}
      {sidebarPosition === 'left' && <MemoRenderSidebar sidebar={sidebar} />}
      <Animated.ScrollView
        ref={scrollViewRef}
        onLayout={onLayout}
        horizontal={true}
        contentContainerStyle={buildStyles.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
      >
        {React.Children.map(sceneChildren, (item, index) => {
          const itemProps = mergeProps(item.props, props);
          return (
            <SegmentedBarItem
              index={index}
              onBoxLayout={onBoxLayout}
              onPress={onPressItem}
              active={index === currentIndex}
              indicatorType={indicatorType}
              {...itemProps}
            />
          );
        })}
        <MemoRenderIndicator
          style={buildStyles.indicatorStyle}
          animatedX={animatedX}
          interpolate={interpolate}
          contentItemWidth={contentItemWidth}
        />
      </Animated.ScrollView>
      {sidebarPosition === 'right' && <MemoRenderSidebar sidebar={sidebar} />}
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
  },
});

SegmentedBar.propTypes = {
  ...SegmentedBarItem.type.propTypes,
  indicatorType: PropTypes.oneOf(['none', 'box', 'item', 'custom']),
  style: ViewPropTypes.style,
  indicatorStyle: ViewPropTypes.style,
  sidebarPosition: PropTypes.oneOf(['left', 'right']),
  sidebar: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  animatedX: PropTypes.any,
  sceneChildren: PropTypes.any,
  currentIndex: PropTypes.number,
  onPressItem: PropTypes.func,
};

SegmentedBar.defaultProps = {
  indicatorType: 'box',
  sidebarPosition: 'right',
};

export default React.memo(SegmentedBar);