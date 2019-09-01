'use strict';
import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, NativeModules, Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Button from '../Touchable/Button';
import { StorageManager } from '../../common/manager';
import { Predefine } from '../../config/predefine';

const DevSettings = NativeModules.DevSettings;
const DevMenu = NativeModules.DevMenu;

function DevRefresh() {
  const lastOffsetRef = useRef({ x: 0, y: 0 });
  const opacityRef = useRef(new Animated.Value(0));
  const transformXYRef = useRef(new Animated.ValueXY({ x: 0, y: 0 }));
  const onGestureEventRef = useRef(
    Animated.event(
      [
        {
          nativeEvent: {
            translationX: transformXYRef.current.x,
            translationY: transformXYRef.current.y,
          },
        },
      ],
      { useNativeDriver: true },
    ),
  );

  const onPress = useCallback(() => {
    DevSettings.reload();
  }, []);

  const onLongPress = useCallback(() => {
    DevMenu.show();
  }, []);

  const onHandleStateChange = useCallback((event) => {
    const { state, translationX, translationY } = event.nativeEvent;
    if (state === State.END) {
      lastOffsetRef.current.x += translationX;
      lastOffsetRef.current.y += translationY;
      transformXYRef.current.x.setOffset(lastOffsetRef.current.x);
      transformXYRef.current.x.setValue(0);
      transformXYRef.current.y.setOffset(lastOffsetRef.current.y);
      transformXYRef.current.y.setValue(0);
      StorageManager.save('DevRefresh', {
        offsetX: lastOffsetRef.current.x,
        offsetY: lastOffsetRef.current.y,
        translationX: translationX,
        translationY: translationY,
      });
    }
  }, []);

  useEffect(() => {
    StorageManager.load('DevRefresh').then((data) => {
      if (data) {
        transformXYRef.current.x.setOffset(data.offsetX);
        transformXYRef.current.y.setOffset(data.offsetY);
        lastOffsetRef.current.x = data.offsetX;
        lastOffsetRef.current.y = data.offsetY;
      }
      opacityRef.current.setValue(1);
    });
  }, []);

  if (__DEV__) {
    return (
      <PanGestureHandler
        onGestureEvent={onGestureEventRef.current}
        onHandlerStateChange={onHandleStateChange}
      >
        <Animated.View
          style={[
            styles.container,
            {
              opacity: opacityRef.current,
              transform: [
                {
                  translateX: Animated.add(
                    transformXYRef.current.x.interpolate({
                      inputRange: [-(Predefine.screenWidth - 40), 0],
                      outputRange: [-(Predefine.screenWidth - 40), 0],
                      extrapolate: 'clamp',
                    }),
                    new Animated.Value(-0),
                  ),
                },
                {
                  translateY: Animated.add(
                    transformXYRef.current.y.interpolate({
                      inputRange: [-(Predefine.screenHeight - 40), 40],
                      outputRange: [-(Predefine.screenHeight - 40), 40],
                      extrapolate: 'clamp',
                    }),
                    new Animated.Value(-0),
                  ),
                },
              ],
            },
          ]}
        >
          <Button
            type={'clear'}
            activeOpacity={1.0}
            style={styles.button}
            icon={require('react-native/Libraries/NewAppScreen/components/logo.png')}
            iconStyle={{ width: 40, height: 40 }}
            onPress={onPress}
            onLongPress={onLongPress}
            delayLongPress={500}
            hitSlop={null}
          />
        </Animated.View>
      </PanGestureHandler>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    bottom: 50,
  },
  button: {},
});

DevRefresh.propTypes = {};

DevRefresh.defaultProps = {};

export default React.memo(DevRefresh);
