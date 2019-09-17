'use strict';
import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import { OverlayPull, OverlayPop } from '.';

let keyValue = 0;

export default class OverlayManager {
  static keys = [];

  static pull(component, option) {
    return this.show(<OverlayPull {...option}>{component}</OverlayPull>);
  }

  static pop(component, option) {
    console.log('option', option);
    return this.show(<OverlayPop {...option}>{component}</OverlayPop>);
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
          if (index !== -1) {
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
    return key;
  }

  static hide(key) {
    let index = -1;
    if (key) {
      index = this.keys.findIndex((item) => item.key === key);
    } else {
      index = this.keys.length - 1;
    }
    if (index !== -1) {
      const { key: _key, disappear } = this.keys[index];
      if (disappear) {
        disappear();
      } else {
        this._remove(_key);
      }
    }
  }

  static hideAll() {
    this._removeAll();
  }

  static _add(element) {
    const key = ++keyValue;
    this.keys.push({ key });
    console.log('_add', this.keys);
    DeviceEventEmitter.emit('addOverlay', { key, element });
    return key;
  }

  static _remove(key) {
    const index = this.keys.findIndex((item) => item.key === key);
    if (index !== -1) {
      this.keys.splice(index, 1);
    }
    console.log('_remove', this.keys);
    DeviceEventEmitter.emit('removeOverlay', { key });
  }

  static _removeAll() {
    this.keys = [];
    DeviceEventEmitter.emit('removeAllOverlay', {});
  }
}
