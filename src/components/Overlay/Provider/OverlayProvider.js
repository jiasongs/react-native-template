'use strict';
import React, { useState, useCallback, useMemo } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { useEventListener } from '../../../common/hooks';

const MemoOverlayElements = React.memo((props) => {
  const { elements, onProviderAnimated, onElementsDisappear } = props;

  return elements.map((item) => {
    const onDisappearCompletedSave = item.element.props
      ? item.element.props.onDisappearCompleted
      : null;
    const key = item.key;
    return React.cloneElement(item.element, {
      key: '__Top' + key,
      onProviderAnimated: (style) => {
        onProviderAnimated(key, style);
      },
      onDisappearCompleted: () => {
        onElementsDisappear(key);
        onDisappearCompletedSave && onDisappearCompletedSave(key);
      },
    });
  });
});

const MemoChildren = React.memo((props) => {
  return props.children;
});

function OverlayProvider(props) {
  const { children } = props;

  const [animateStyle, setAnimateStyle] = useState([]);
  const [elements, setElements] = useState([]);

  const add = useCallback(({ key, element }) => {
    setElements((preElements) => {
      let newElements = preElements.slice();
      newElements.push({ key, element });
      return newElements;
    });
  }, []);

  const remove = useCallback(({ key }) => {
    setElements((preElements) => {
      let newElements = preElements.slice();
      for (let i = newElements.length - 1; i >= 0; --i) {
        if (newElements[i].key === key) {
          newElements.splice(i, 1);
          break;
        }
      }
      return newElements;
    });
  }, []);

  const removeAll = useCallback(() => {
    setElements([]);
  }, []);

  const onProviderAnimated = useCallback((key, style) => {
    setAnimateStyle((preStyle) => {
      return preStyle.concat([{ ...StyleSheet.flatten(style), key }]);
    });
  }, []);

  const onElementsDisappear = useCallback((key) => {
    // 重置
    setAnimateStyle((preStyle) => {
      if (preStyle.length === 0) {
        return preStyle;
      }
      const newPreStyle = preStyle.slice();
      const index = newPreStyle.findIndex((item) => item.key === key);
      if (index !== -1) {
        newPreStyle.splice(index, 1);
      }
      return newPreStyle;
    });
  }, []);

  useEventListener('addOverlay', add);
  useEventListener('removeOverlay', remove);
  useEventListener('removeAllOverlay', removeAll);

  const buildStyles = useMemo(() => {
    return {
      contentStyle: [{ flex: 1 }, animateStyle],
    };
  }, [animateStyle]);

  return (
    <View style={styles.container}>
      <Animated.View style={buildStyles.contentStyle}>
        <MemoChildren children={children} />
      </Animated.View>
      <MemoOverlayElements
        elements={elements}
        onProviderAnimated={onProviderAnimated}
        onElementsDisappear={onElementsDisappear}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

OverlayProvider.propTypes = {};

OverlayProvider.defaultProps = {};

export default React.memo(OverlayProvider);
