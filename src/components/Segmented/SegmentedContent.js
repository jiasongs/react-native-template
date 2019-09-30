'use strict';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Animated, FlatList, Platform, StyleSheet } from 'react-native';
import Viewpager from '@react-native-community/viewpager';
import SegmentedContentScene from './SegmentedContentScene';

const AnimatedViewpager = Animated.createAnimatedComponent(Viewpager);

function SegmentedContent(props) {
  const {
    children,
    style,
    onScroll,
    onLayout,
    contentLayout,
    lazy,
    currentFocus,
    forwardedRef,
    initialPage,
    animatedXRef,
    onMomentumScrollEnd,
    ...others
  } = props;

  const contentOffsetXRef = useRef(0);
  const positionRef = useRef(new Animated.Value(initialPage));
  const offsetRef = useRef(new Animated.Value(0));
  const widthRef = useRef(new Animated.Value(0));

  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const onLayoutBack = useCallback(
    (event) => {
      const aLayout = event.nativeEvent.layout;
      widthRef.current.setValue(aLayout.width);
      contentOffsetXRef.current = aLayout.width * initialPage;
      setLayout(aLayout);
      onLayout && onLayout(event);
    },
    [initialPage, onLayout],
  );

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <SegmentedContentScene
          active={lazy ? currentFocus === index : true}
          contentLayout={layout}
        >
          {item}
        </SegmentedContentScene>
      );
    },
    [currentFocus, layout, lazy],
  );

  const getItemLayout = useCallback(
    (data, index) => {
      return { length: layout.width, offset: layout.width * index, index };
    },
    [layout],
  );

  const onScrollBack = useCallback(
    (event) => {
      if (Platform.OS === 'android') {
        const { offset, position } = event.nativeEvent;
        const contentOffsetX = (offset + position) * layout.width;
        contentOffsetXRef.current = contentOffsetX;
        onScroll({
          nativeEvent: {
            contentOffset: { x: contentOffsetX },
          },
        });
      } else {
        onScroll(event);
      }
    },
    [layout, onScroll],
  );

  const onPageScrollStateChanged = useCallback(
    (event) => {
      const { pageScrollState } = event.nativeEvent;
      if (pageScrollState === 'idle') {
        onMomentumScrollEnd({
          nativeEvent: {
            contentOffset: { x: contentOffsetXRef.current },
          },
        });
      }
    },
    [onMomentumScrollEnd],
  );

  const keyExtractor = useCallback((item, index) => {
    return `scene_${item.key || index}`;
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      animatedXRef.current = Animated.multiply(
        Animated.add(positionRef.current, offsetRef.current),
        widthRef.current,
      );
    }
  }, [animatedXRef]);

  if (Platform.OS === 'android') {
    return (
      <AnimatedViewpager
        ref={forwardedRef}
        style={styles.container}
        onLayout={onLayoutBack}
        initialPage={initialPage}
        onPageScroll={Animated.event(
          [
            {
              nativeEvent: {
                position: positionRef.current,
                offset: offsetRef.current,
              },
            },
          ],
          { useNativeDriver: true, listener: onScrollBack },
        )}
        onPageScrollStateChanged={onPageScrollStateChanged}
      >
        {React.Children.map(children, (item, index) => {
          return renderItem({ item, index });
        })}
      </AnimatedViewpager>
    );
  }

  return (
    <Animated.FlatList
      {...others}
      style={styles.container}
      ref={forwardedRef}
      onLayout={onLayoutBack}
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={true}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: { x: animatedXRef.current },
            },
          },
        ],
        { useNativeDriver: true, listener: onScrollBack },
      )}
      decelerationRate={0.998}
      nestedScrollEnabled={true}
      initialScrollIndex={initialPage}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      data={children}
      renderItem={renderItem}
      extraData={layout}
      onMomentumScrollEnd={onMomentumScrollEnd}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

SegmentedContent.propTypes = {
  ...FlatList.propTypes,
};

SegmentedContent.defaultProps = {};

const MemoSegmentedContent = React.memo(SegmentedContent);
const ForwardSegmentedContent = React.forwardRef((props, ref) => {
  return <MemoSegmentedContent forwardedRef={ref} {...props} />;
});

export default ForwardSegmentedContent;
