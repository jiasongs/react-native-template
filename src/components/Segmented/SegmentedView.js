'use strict';
import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { View, StyleSheet, Animated, ViewPropTypes, Image } from 'react-native';
import PropTypes from 'prop-types';
import SegmentedBar from './SegmentedBar';
import SegmentedContent from './SegmentedContent';

function SegmentedView(props) {
  const {
    children,
    style,
    contentStyle,
    barStyle,
    indicatorType,
    indicatorStyle,
    showSegmentedBar,
    initialPage,
    lazy,
    activeIndex,
    onChange,
    barBackgroundImage,
    ...others
  } = props;

  const scrollViewRef = useRef(React.createRef());
  const animatedXRef = useRef(new Animated.Value(0));
  const itemPressIndexRef = useRef(-1);
  const isHandleInitialPageRef = useRef(false);
  const currentIndexRef = useRef(initialPage);
  const currentFocusRef = useRef(initialPage);

  const [contentLayout, setContentLayout] = useState({ width: 0, height: 0 });
  const [currentIndex, setCurrentIndex] = useState(initialPage);
  const [currentFocus, setCurrentFocus] = useState(initialPage);

  const buildStyles = useMemo(() => {
    return {
      style: [styles.container, style],
      barStyle: barStyle,
      barIndicatorStyle: indicatorStyle,
      contentStyle: contentStyle,
    };
  }, [barStyle, contentStyle, indicatorStyle, style]);

  const setActiveIndex = useCallback(
    (index) => {
      if (currentIndexRef.current !== index) {
        currentIndexRef.current = index;
        itemPressIndexRef.current = -1;
        if (activeIndex === -1) {
          setCurrentIndex(index);
        }
        onChange && onChange(index);
      }
    },
    [activeIndex, onChange],
  );

  const setFocusIndex = useCallback((index) => {
    if (currentFocusRef.current !== index) {
      currentFocusRef.current = index;
      setCurrentFocus(index);
    }
  }, []);

  const scrollToIndex = useCallback(
    ({ index, animated }) => {
      if (contentLayout.width !== 0) {
        const scrollView = scrollViewRef.current._component;
        scrollView.scrollTo({
          x: contentLayout.width * index,
          y: 0,
          animated: animated,
        });
      }
    },
    [contentLayout],
  );

  const onPressItem = useCallback(
    (index) => {
      if (currentIndexRef.current !== index) {
        itemPressIndexRef.current = index;
        scrollToIndex({ index, animated: true });
      }
    },
    [scrollToIndex],
  );

  const onScroll = useCallback(
    (event) => {
      const { contentOffset } = event.nativeEvent;
      const radio = contentOffset.x / contentLayout.width;
      const index = Math.round(radio);
      if (itemPressIndexRef.current !== -1) {
        if (itemPressIndexRef.current === index) {
          setFocusIndex(index);
          setActiveIndex(index);
        }
      } else {
        if (Number.isInteger(radio)) {
          setFocusIndex(index);
        }
        setActiveIndex(index);
      }
    },
    [contentLayout, setActiveIndex, setFocusIndex],
  );

  const onLayout = useCallback((event) => {
    setContentLayout(event.nativeEvent.layout);
  }, []);

  useEffect(() => {
    if (contentLayout.width !== 0) {
      if (!isHandleInitialPageRef.current) {
        isHandleInitialPageRef.current = true;
        scrollToIndex({ index: initialPage, animated: false });
      }
    }
  }, [contentLayout, initialPage, scrollToIndex]);

  if (!children || (Array.isArray(children) && children.length <= 1)) {
    return null;
  }

  return (
    <View style={buildStyles.style}>
      {showSegmentedBar ? (
        <SegmentedBar
          {...others}
          style={buildStyles.barStyle}
          indicatorType={indicatorType}
          animatedX={animatedXRef.current}
          sceneChildren={children}
          currentIndex={activeIndex !== -1 ? activeIndex : currentIndex}
          indicatorStyle={buildStyles.barIndicatorStyle}
          contentLayout={contentLayout}
          onPressItem={onPressItem}
          backgroundImage={barBackgroundImage}
        />
      ) : null}
      <SegmentedContent
        ref={scrollViewRef}
        style={buildStyles.contentStyle}
        lazy={lazy}
        onLayout={onLayout}
        currentFocus={currentFocus}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: animatedXRef.current } } }],
          { useNativeDriver: true, listener: onScroll },
        )}
      >
        {children}
      </SegmentedContent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

SegmentedView.propTypes = {
  ...SegmentedBar.type.propTypes,
  style: ViewPropTypes.style,
  indicatorType: SegmentedBar.type.propTypes.indicatorType,
  barStyle: ViewPropTypes.style,
  showSegmentedBar: PropTypes.bool,
  initialPage: PropTypes.number,
  activeIndex: PropTypes.number,
  lazy: PropTypes.bool, // 懒加载
  onChange: PropTypes.func,
  sidebarPosition: PropTypes.oneOf(['left', 'right']),
  sidebar: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  barBackgroundImage: Image.propTypes.source,
};

SegmentedView.defaultProps = {
  showSegmentedBar: true,
  initialPage: 0,
  lazy: true,
  activeIndex: -1,
};

export default React.memo(SegmentedView);
