'use strict';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ViewPropTypes,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import SegmentedBar from './SegmentedBar';
import SegmentedContentScene from './SegmentedContentScene';

function SegmentedContent(props) {
  const {
    children,
    style,
    onScroll,
    onLayout,
    contentLayout,
    lazy,
    currentIndex,
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
      scrollEventThrottle={1}
      onScroll={onScroll}
      {...others}
    >
      {React.Children.map(children, (item, index) => {
        return (
          <SegmentedContentScene
            key={`page_${item.key || index}`}
            active={lazy ? currentIndex === index : true}
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
