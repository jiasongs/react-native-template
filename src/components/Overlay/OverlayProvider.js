'use strict';
import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useEventListener } from '../../common/hooks';

function OverlayProvider(props) {
  const { children } = props;
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

  useEventListener('addOverlay', add);
  useEventListener('removeOverlay', remove);
  useEventListener('removeAllOverlay', removeAll);

  return (
    <View style={styles.container}>
      {children}
      {elements.map((item) => {
        return React.cloneElement(item.element, {
          key: '__Top' + item.key,
        });
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

OverlayProvider.propTypes = {};

OverlayProvider.defaultProps = {};

export default React.memo(OverlayProvider);
