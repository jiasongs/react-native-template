'use strict';
import React, { useState, useCallback } from 'react';
import { Animated, FlatList } from 'react-native';
import SegmentedContentScene from './SegmentedContentScene';

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
    ...others
  } = props;

  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const onLayoutBack = useCallback(
    (event) => {
      setLayout(event.nativeEvent.layout);
      onLayout && onLayout(event);
    },
    [onLayout],
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

  const keyExtractor = useCallback((item, index) => {
    return `scene_${item.key || index}`;
  }, []);

  return (
    <Animated.FlatList
      {...others}
      ref={forwardedRef}
      onLayout={onLayoutBack}
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={true}
      scrollEventThrottle={16}
      onScroll={onScroll}
      decelerationRate={'normal'}
      nestedScrollEnabled={true}
      initialScrollIndex={initialPage}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      data={children}
      renderItem={renderItem}
      extraData={layout}
    />
  );
}

SegmentedContent.propTypes = {
  ...FlatList.propTypes,
};

SegmentedContent.defaultProps = {};

const MemoSegmentedContent = React.memo(SegmentedContent);
const ForwardSegmentedContent = React.forwardRef((props, ref) => {
  return <MemoSegmentedContent forwardedRef={ref} {...props} />;
});

export default ForwardSegmentedContent;
