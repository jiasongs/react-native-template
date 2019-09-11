'use strict';
import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import { OverlayPull, OverlayPop } from '../Overlay';

let keyValue = 0;

export default class OverlayManager {
  static keys = [];

  static pull(component, option) {
    this.show(<OverlayPull {...option}>{component}</OverlayPull>);
  }

  static pop(component, option) {
    this.show(<OverlayPop {...option}>{component}</OverlayPop>);
  }

  static show(overlayView) {
    const onDisappearCompletedSave = overlayView.props
      ? overlayView.props.onDisappearCompleted
      : null;
    const onPrepareSave = overlayView.props
      ? overlayView.props.onPrepare
      : null;
    const key = this._add(
      React.cloneElement(overlayView, {
        onPrepare: (appear, disappear) => {
          const index = this.keys.findIndex((item) => item.key === key);
          const overlay = { key, appear, disappear };
          if (index === -1) {
            this.keys.push(overlay);
          } else {
            this.keys[index] = overlay;
          }
          if (onPrepareSave) {
            onPrepareSave(overlay);
          } else {
            appear && appear();
          }
        },
        onDisappearCompleted: () => {
          this._remove(key);
          onDisappearCompletedSave && onDisappearCompletedSave();
        },
      }),
    );
    this.keys.push({ key });
    return key;
  }

  static hide(key) {
    let index = -1;
    if (key) {
      index = this.keys.findIndex((item) => item.key === key);
    } else {
      if (this.keys.length > 0) {
        index = this.keys.length - 1;
      }
    }
    if (index !== -1) {
      const { disappear } = this.keys[index];
      if (disappear) {
        disappear();
      } else {
        this._remove(key);
      }
      this.keys.splice(index, 1);
    }
  }

  static hideAll() {
    this._removeAll();
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
