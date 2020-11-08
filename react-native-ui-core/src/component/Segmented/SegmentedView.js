'use strict';
import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ViewPropTypes,
  Image,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import SegmentedBar from './SegmentedBar';
import SegmentedContent from './SegmentedContent';

function SegmentedView(props) {
  const {
    children,
    style,
    contentStyle,
    barStyle,
    indicatorWidthType,
    indicatorStyle,
    showSegmentedBar,
    initialPage,
    lazy,
    activeIndex,
    onChange,
    barBackgroundImage,
    ...others
  } = props;

  const listViewRef = useRef();
  const animatedXRef = useRef(new Animated.Value(0));
  const itemPressIndexRef = useRef(-1);
  const preChildenLength = useRef(-1);
  const currentIndexRef = useRef(initialPage);
  const currentFocusRef = useRef(initialPage);

  const [currentIndex, setCurrentIndex] = useState(initialPage);
  const [currentFocus, setCurrentFocus] = useState(initialPage);
  const [contentLayout, setContentLayout] = useState({ width: 0, height: 0 });

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
        const listView = listViewRef.current;
        if (Platform.OS === 'android') {
          listView.setPage(index);
        } else {
          listView.scrollToIndex({
            index,
            animated: animated,
          });
        }
      }
    },
    [contentLayout.width],
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
      const roundIndex = Math.round(radio);
      if (itemPressIndexRef.current !== -1) {
        if (itemPressIndexRef.current === roundIndex) {
          setFocusIndex(roundIndex);
          setActiveIndex(roundIndex);
        }
      } else {
        setActiveIndex(roundIndex);
      }
    },
    [contentLayout, setActiveIndex, setFocusIndex],
  );

  const onMomentumScrollEnd = useCallback(
    (event) => {
      const { contentOffset } = event.nativeEvent;
      const radio = contentOffset.x / contentLayout.width;
      const roundIndex = Math.round(radio);
      setFocusIndex(roundIndex);
    },
    [contentLayout.width, setFocusIndex],
  );

  const onLayout = useCallback((event) => {
    setContentLayout(event.nativeEvent.layout);
  }, []);

  useEffect(() => {
    if (activeIndex !== -1) {
      onPressItem(activeIndex);
    }
  }, [activeIndex, onPressItem]);

  useEffect(() => {
    if (Array.isArray(children)) {
      if (preChildenLength.current !== children.length) {
        // children减少
        if (
          preChildenLength.current !== -1 &&
          children.length < preChildenLength.current
        ) {
          if (currentFocusRef.current === preChildenLength.current - 1) {
            setFocusIndex(currentFocusRef.current - 1);
          }
        }
        preChildenLength.current = children.length;
      }
    }
  }, [children, scrollToIndex, setActiveIndex, setFocusIndex]);

  if (!children || (Array.isArray(children) && children.length <= 1)) {
    return null;
  }

  return (
    <View style={buildStyles.style}>
      {showSegmentedBar ? (
        <SegmentedBar
          {...others}
          style={buildStyles.barStyle}
          indicatorWidthType={indicatorWidthType}
          animatedXRef={animatedXRef}
          sceneChildren={children}
          currentIndex={activeIndex !== -1 ? activeIndex : currentIndex}
          indicatorStyle={buildStyles.barIndicatorStyle}
          contentLayout={contentLayout}
          onPressItem={onPressItem}
          backgroundImage={barBackgroundImage}
        />
      ) : null}
      <SegmentedContent
        ref={listViewRef}
        style={buildStyles.contentStyle}
        lazy={lazy}
        initialPage={initialPage}
        onLayout={onLayout}
        currentFocus={currentFocus}
        animatedXRef={animatedXRef}
        onScroll={onScroll}
        onMomentumScrollEnd={onMomentumScrollEnd}
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
  indicatorWidthType: SegmentedBar.type.propTypes.indicatorWidthType,
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
