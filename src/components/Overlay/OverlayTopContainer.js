'use strict';
import React from 'react';
import { StyleSheet, AppRegistry, DeviceEventEmitter, View, Animated } from 'react-native';

class OverlayTopContainer extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = { elements: [] };
    this.animates = {
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(0),
      scaleX: new Animated.Value(1),
      scaleY: new Animated.Value(1),
    };
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('addOverlay', this.add);
    DeviceEventEmitter.addListener('removeOverlay', this.remove);
    DeviceEventEmitter.addListener('removeAllOverlay', this.removeAll);
    DeviceEventEmitter.addListener('transformRoot', this.transform);
    DeviceEventEmitter.addListener('restoreRoot', this.restore);
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners('addOverlay');
    DeviceEventEmitter.removeAllListeners('removeOverlay');
    DeviceEventEmitter.removeAllListeners('removeAllOverlay');
    DeviceEventEmitter.removeAllListeners('transformRoot');
    DeviceEventEmitter.removeAllListeners('restoreRoot');
  }

  add = ({ key, element }) => {
    const { elements } = this.state;
    let newElements = elements.slice();
    newElements.push({ key, element });
    this.setState({ elements: newElements });
  }

  remove = ({ key }) => {
    const { elements } = this.state;
    let newElements = elements.slice();
    for (let i = newElements.length - 1; i >= 0; --i) {
      if (newElements[i].key === key) {
        newElements.splice(i, 1);
        break;
      }
    }
    this.setState({ elements: newElements });
  }

  removeAll = () => {
    this.setState({ elements: [] });
  }

  transform = ({ transform, animated, animatesOnly }) => {
    const { translateX, translateY, scaleX, scaleY } = this.animates;
    let tx = 0, ty = 0, sx = 1, sy = 1;
    transform.map((item) => {
      if (item && typeof item === 'object') {
        // eslint-disable-next-line no-unused-vars
        for (const itemKey in item) {
          const value = item[itemKey];
          switch (itemKey) {
            case 'translateX': tx = value; break;
            case 'translateY': ty = value; break;
            case 'scaleX': sx = value; break;
            case 'scaleY': sy = value; break;
          }
        }
      }
    });
    if (animated) {
      const animates = [
        Animated.spring(translateX, { toValue: tx, friction: 9, useNativeDriver: true }),
        Animated.spring(translateY, { toValue: ty, friction: 9, useNativeDriver: true }),
        Animated.spring(scaleX, { toValue: sx, friction: 9, useNativeDriver: true }),
        Animated.spring(scaleY, { toValue: sy, friction: 9, useNativeDriver: true }),
      ];
      animatesOnly ? animatesOnly(animates) : Animated.parallel(animates).start();
    } else {
      if (animatesOnly) {
        const animates = [
          Animated.timing(translateX, { toValue: tx, duration: 1, useNativeDriver: true }),
          Animated.timing(translateY, { toValue: ty, duration: 1, useNativeDriver: true }),
          Animated.timing(scaleX, { toValue: sx, duration: 1, useNativeDriver: true }),
          Animated.timing(scaleY, { toValue: sy, duration: 1, useNativeDriver: true }),
        ];
        animatesOnly(animates);
      } else {
        translateX.setValue(tx);
        translateY.setValue(ty);
        scaleX.setValue(sx);
        scaleY.setValue(sy);
      }
    }
  }

  restore = ({ animated, animatesOnly }) => {
    const { translateX, translateY, scaleX, scaleY } = this.animates;
    if (animated) {
      const animates = [
        Animated.spring(translateX, { toValue: 0, friction: 9, useNativeDriver: true }),
        Animated.spring(translateY, { toValue: 0, friction: 9, useNativeDriver: true }),
        Animated.spring(scaleX, { toValue: 1, friction: 9, useNativeDriver: true }),
        Animated.spring(scaleY, { toValue: 1, friction: 9, useNativeDriver: true }),
      ];
      animatesOnly ? animatesOnly(animates) : Animated.parallel(animates).start();
    } else {
      if (animatesOnly) {
        const animates = [
          Animated.timing(translateX, { toValue: 0, duration: 1, useNativeDriver: true }),
          Animated.timing(translateY, { toValue: 0, duration: 1, useNativeDriver: true }),
          Animated.timing(scaleX, { toValue: 1, duration: 1, useNativeDriver: true }),
          Animated.timing(scaleY, { toValue: 1, duration: 1, useNativeDriver: true }),
        ];
        animatesOnly(animates);
      } else {
        translateX.setValue(0);
        translateY.setValue(0);
        scaleX.setValue(1);
        scaleY.setValue(1);
      }
    }
  }

  render() {
    const { translateX, translateY, scaleX, scaleY } = this.animates;
    const transform = [{ translateX }, { translateY }, { scaleX }, { scaleY }];
    const { elements } = this.state;
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.container, { transform: transform }]}>
          {this.props.children}
        </Animated.View>
        {elements.map((item) => {
          return React.cloneElement(item.element, {
            key: '__Top' + item.key
          });
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

OverlayTopContainer.registerProvider = function () {
  if (!AppRegistry.__overlayRegisterComponentOld) {
    AppRegistry.__overlayRegisterComponentOld = AppRegistry.registerComponent;
    AppRegistry.registerComponent = function (appKey, componentProvider) {
      function RootElement(props) {
        const Component = componentProvider();
        return (
          <OverlayTopContainer>
            <Component {...props} />
          </OverlayTopContainer>
        );
      }
      return AppRegistry.__overlayRegisterComponentOld(appKey, () => React.memo(RootElement));
    };
  }
};

export default OverlayTopContainer;


