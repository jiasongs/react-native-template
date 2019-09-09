'use strict';
import React, { useState, useCallback } from 'react';
import { Animated, ScrollView } from 'react-native';
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

  return (
    <Animated.ScrollView
      ref={forwardedRef}
      onLayout={onLayoutBack}
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={true}
      scrollEventThrottle={16}
      onScroll={onScroll}
      {...others}
    >
      {React.Children.map(children, (item, index) => {
        return (
          <SegmentedContentScene
            key={`page_${item.key || index}`}
            active={lazy ? currentFocus === index : true}
            contentLayout={layout}
          >
            {item}
          </SegmentedContentScene>
        );
      })}
    </Animated.ScrollView>
  );
}

SegmentedContent.propTypes = {
  ...ScrollView.propTypes,
};

SegmentedContent.defaultProps = {
  ...ScrollView.defaultProps,
};

const MemoSegmentedContent = React.memo(SegmentedContent);
const ForwardSegmentedContent = React.forwardRef((props, ref) => {
  return <MemoSegmentedContent forwardedRef={ref} {...props} />;
});

export default ForwardSegmentedContent;
