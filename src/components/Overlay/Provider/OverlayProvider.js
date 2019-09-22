'use strict';
import React, { useState, useCallback, useMemo } from 'react';
import { Animated, View, StyleSheet, ViewPropTypes } from 'react-native';
import { useEventListener } from '../../../common/hooks';
import OverlayManager, {
  AddOverlayType,
  RemoveOverlayType,
  RemoveAllOverlayType,
} from '../Provider/OverlayManager';

function OverlayElementItem(props) {
  const { elementKey, element, onProviderAnimated } = props;

  const onAnimated = useCallback(
    (style) => {
      onProviderAnimated(elementKey, style);
    },
    [elementKey, onProviderAnimated],
  );

  const onPrepare = useCallback(
    (appear, disappear) => {
      const overlayKeys = OverlayManager.overlayKeys;
      const onPrepareSave = element.props ? element.props.onPrepare : null;
      const index = overlayKeys.findIndex((item) => item.key === elementKey);
      const overlay = { key: elementKey, appear, disappear };
      if (index !== -1) {
        overlayKeys[index] = overlay;
      }
      onPrepareSave && onPrepareSave(overlay);
    },
    [element, elementKey],
  );

  const onPrepareCompleted = useCallback(() => {
    const overlayKeys = OverlayManager.overlayKeys;
    const onPrepareCompletedSave = element.props
      ? element.props.onPrepareCompleted
      : null;
    const index = overlayKeys.findIndex((item) => item.key === elementKey);
    if (index !== -1) {
      const overlay = overlayKeys[index];
      if (onPrepareCompletedSave) {
        onPrepareCompletedSave(overlay);
      } else {
        overlay.appear();
      }
    }
  }, [element, elementKey]);

  const onDisappear = useCallback(() => {
    const onDisappearCompletedSave = element.props
      ? element.props.onDisappearCompleted
      : null;
    onDisappearCompletedSave && onDisappearCompletedSave();
    OverlayManager._remove(elementKey);
  }, [element, elementKey]);

  return React.cloneElement(element, {
    onPrepare: onPrepare,
    onPrepareCompleted: onPrepareCompleted,
    onDisappearCompleted: onDisappear,
    onProviderAnimated: onAnimated,
  });
}

const MemoOverlayElementItem = React.memo(OverlayElementItem);

function OverlayElements(props) {
  const { elements, onProviderAnimated } = props;

  return elements.map((item) => {
    return (
      <MemoOverlayElementItem
        key={'__Top' + item.key}
        elementKey={item.key}
        element={item.element}
        onProviderAnimated={onProviderAnimated}
      />
    );
  });
}

function OverlayChildren(props) {
  return props.children;
}

const MemoOverlayElements = React.memo(OverlayElements);
const MemoOverlayChildren = React.memo(OverlayChildren);

function OverlayProvider(props) {
  const { style, children } = props;

  const [animateStyle, setAnimateStyle] = useState([]);
  const [elements, setElements] = useState([]);

  const add = useCallback(({ key, element }) => {
    setElements((preElements) => {
      const newElements = preElements.slice();
      newElements.push({ key, element });
      return newElements;
    });
  }, []);

  const remove = useCallback(({ key }) => {
    setElements((preElements) => {
      const newElements = preElements.slice();
      const index = newElements.findIndex((item) => item.key === key);
      if (index !== -1) {
        newElements.splice(index, 1);
      }
      return newElements;
    });
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

  const removeAll = useCallback(() => {
    setElements([]);
  }, []);

  const onProviderAnimated = useCallback((key, aStyle) => {
    setAnimateStyle((preStyle) => {
      return preStyle.concat([{ ...StyleSheet.flatten(aStyle), key }]);
    });
  }, []);

  useEventListener(AddOverlayType, add);
  useEventListener(RemoveOverlayType, remove);
  useEventListener(RemoveAllOverlayType, removeAll);

  const buildStyles = useMemo(() => {
    return {
      style: [styles.container, style],
      contentStyle: [{ flex: 1 }, animateStyle],
    };
  }, [animateStyle, style]);

  return (
    <View style={buildStyles.style}>
      <Animated.View style={buildStyles.contentStyle}>
        <MemoOverlayChildren children={children} />
      </Animated.View>
      <MemoOverlayElements
        elements={elements}
        onProviderAnimated={onProviderAnimated}
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

OverlayProvider.propTypes = {
  style: ViewPropTypes.style,
};

OverlayProvider.defaultProps = {};

export default React.memo(OverlayProvider);
