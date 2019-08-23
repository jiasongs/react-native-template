'use strict';
import React from 'react';
import { DeviceEventEmitter } from 'react-native';

let keyValue = 0;

export default class OverlayManager {
  static show(overlayView) {
    const onDisappearCompletedSave = overlayView.props.onDisappearCompleted;
    const key = this._add(
      React.cloneElement(overlayView, {
        onDisappearCompleted: () => {
          this._remove(key);
          onDisappearCompletedSave && onDisappearCompletedSave();
        },
      }),
    );
    return key;
  }

  static hide(key) {
    this._remove(key);
  }

  static transformRoot(transform, animated, animatesOnly = null) {
    this._transform(transform, animated, animatesOnly);
  }

  static restoreRoot(animated, animatesOnly = null) {
    this._restore(animated, animatesOnly);
  }

  static _add(element) {
    let key = ++keyValue;
    DeviceEventEmitter.emit('addOverlay', { key, element });
    return key;
  }

  static _remove(key) {
    DeviceEventEmitter.emit('removeOverlay', { key });
  }

  static _removeAll() {
    DeviceEventEmitter.emit('removeAllOverlay', {});
  }

  static _transform(transform, animated, animatesOnly = null) {
    DeviceEventEmitter.emit('transformRoot', {
      transform,
      animated,
      animatesOnly,
    });
  }

  static _restore(animated, animatesOnly = null) {
    DeviceEventEmitter.emit('restoreRoot', { animated, animatesOnly });
  }
}
