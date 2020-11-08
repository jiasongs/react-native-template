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
  ViewPropTypes,
  ImageBackground,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import SegmentedBarItem from './SegmentedBarItem';
import { useTheme } from '../Theme';
import { isEqualToLayout, mergeProps } from './Util';
import { RenderNode } from '../Helpers';

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

const MemoRenderIndicator = React.memo(RenderIndicator);

function SegmentedBar(props) {
  const {
    indicatorType,
    indicatorWidthType,
    style,
    animatedXRef,
    sceneChildren,
    currentIndex,
    indicatorStyle,
    onPressItem,
    sidebarPosition,
    sidebar,
    contentLayout,
    backgroundImage,
  } = props;

  const themeValue = useTheme('segmented');
  const scrollViewRef = useRef();
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
    if (indicatorWidthType === 'custom') {
      const flattenStyle = StyleSheet.flatten(
        indicatorStyle ? indicatorStyle : {},
      );
      if (!flattenStyle.width) {
        // eslint-disable-next-line no-console
        console.error('error: 当类型为custom时，style必须设置宽度');
      }
      return flattenStyle.width || 0;
    } else if (indicatorWidthType === 'none') {
      return 0;
    }
    return 80;
  }, [indicatorStyle, indicatorWidthType]);

  const buildStyles = useMemo(() => {
    const segmentedBar = themeValue.segmentedBar;
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
        if (!isEqualToLayout(boxLayout, layout)) {
          boxLayoutsRef.current[index] = layout;
          setBoxLayouts(boxLayoutsRef.current.slice());
        }
      } else {
        boxLayoutsRef.current[index] = layout;
        const layoutLength = boxLayoutsRef.current.filter((item) => item)
          .length;
        if (layoutLength === length) {
          setBoxLayouts(boxLayoutsRef.current.slice());
        }
      }
    },
    [sceneChildren],
  );

  useEffect(() => {
    if (boxLayouts.length > 0 && scrollLayout.width !== 0) {
      let boxLayout = boxLayouts[currentIndex];
      boxLayout = boxLayout ? boxLayout : { x: 0, width: 0 };
      const offsetX =
        boxLayout.x - scrollLayout.width / 2 + boxLayout.width / 2;
      if (offsetX) {
        scrollViewRef.current.scrollTo({
          x: offsetX,
          y: 0,
          animated: true,
        });
      }
    }
  }, [scrollLayout, boxLayouts, currentIndex, sceneChildren]);

  useEffect(() => {
    const length = Array.isArray(sceneChildren) ? sceneChildren.length : 1;
    const boxLength = boxLayouts.filter((item) => item).length;
    if (
      boxLength >= length &&
      contentLayout.width !== 0 &&
      contentItemWidth !== 0
    ) {
      let inputRange = [],
        outputRangeX = [],
        outputRangeScale = [],
        nextLayout = {};
      React.Children.forEach(sceneChildren, (item, ii) => {
        const boxLayout = boxLayouts[ii];
        let layoutX = 0;
        let multiple = 1; // 缩放倍数
        if (indicatorWidthType === 'custom') {
          multiple = 1;
          layoutX = boxLayout.x + (boxLayout.width - contentItemWidth) / 2;
        } else {
          multiple = boxLayout.width / contentItemWidth;
          layoutX = boxLayout.x;
        }
        const transformx = (contentItemWidth * (1 - multiple)) / 2;
        inputRange.push(contentLayout.width * ii);
        outputRangeX.push(layoutX - transformx);
        outputRangeScale.push(multiple);
        if (indicatorType === 'lengThen') {
          if (ii < sceneChildren.length - 1) {
            nextLayout = boxLayouts[ii + 1];
          }
          let multiple2 = 1;
          if (indicatorWidthType === 'custom') {
            multiple2 =
              (boxLayout.width -
                (boxLayout.width - contentItemWidth) / 2 +
                (nextLayout.width -
                  (nextLayout.width - contentItemWidth) / 2)) /
              contentItemWidth;
          } else {
            multiple2 =
              (nextLayout.x - boxLayout.x + nextLayout.width) /
              contentItemWidth;
          }
          const transformx2 = (contentItemWidth * (1 - multiple2)) / 2;
          inputRange.push(contentLayout.width * ii + contentLayout.width / 2);
          outputRangeX.push(layoutX - transformx2);
          outputRangeScale.push(multiple2);
        }
      });
      // console.log('inputRange', inputRange);
      // console.log('outputRangeX', outputRangeX);
      // console.log('outputRangeScale', outputRangeScale);
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
    indicatorWidthType,
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
      {sidebarPosition === 'left' && <RenderNode Node={sidebar} />}
      <ScrollView
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
              indicatorWidthType={indicatorWidthType}
              {...itemProps}
            />
          );
        })}
        <MemoRenderIndicator
          style={buildStyles.indicatorStyle}
          animatedX={animatedXRef.current}
          interpolate={interpolate}
          contentItemWidth={contentItemWidth}
        />
      </ScrollView>
      {sidebarPosition === 'right' && <RenderNode Node={sidebar} />}
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
  indicatorType: PropTypes.oneOf(['normal', 'lengThen']),
  indicatorWidthType: PropTypes.oneOf(['none', 'box', 'item', 'custom']),
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
  indicatorType: 'normal',
  indicatorWidthType: 'box',
  sidebarPosition: 'right',
};

export default React.memo(SegmentedBar);
