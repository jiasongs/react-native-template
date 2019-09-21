'use strict';
import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import OverlayPop from '../Views/OverlayPop';
import OverlayPull from '../Views/OverlayPull';
import OverlayPreview from '../Views/OverlayPreview';

let keyValue = 0;

export default class OverlayManager {
  static overlayKeys = [];

  static pull(component, option) {
    return this.show(<OverlayPull {...option}>{component}</OverlayPull>);
  }

  static pop(component, option) {
    return this.show(<OverlayPop {...option}>{component}</OverlayPop>);
  }

  static preview(component, option) {
    return this.show(<OverlayPreview {...option}>{component}</OverlayPreview>);
  }

  static show(overlayView) {
    const onPrepareSave = overlayView.props
      ? overlayView.props.onPrepare
      : null;
    const onPrepareCompletedSave = overlayView.props
      ? overlayView.props.onPrepareCompleted
      : null;
    const onDisappearCompletedSave = overlayView.props
      ? overlayView.props.onDisappearCompleted
      : null;
    const key = this._add(
      React.cloneElement(overlayView, {
        // 准备
        onPrepare: (appear, disappear) => {
          const index = this.overlayKeys.findIndex((item) => item.key === key);
          const overlay = { key, appear, disappear };
          if (index !== -1) {
            this.overlayKeys[index] = overlay;
          }
          onPrepareSave && onPrepareSave(overlay);
        },
        // 准备完成，可以弹出界面
        onPrepareCompleted: () => {
          const index = this.overlayKeys.findIndex((item) => item.key === key);
          if (index !== -1) {
            const overlay = this.overlayKeys[index];
            if (onPrepareCompletedSave) {
              onPrepareCompletedSave(overlay);
            } else {
              overlay.appear && overlay.appear();
            }
          }
        },
        onDisappearCompleted: () => {
          this._remove(key);
          onDisappearCompletedSave && onDisappearCompletedSave(key);
        },
      }),
    );
    return key;
  }

  static hide(key) {
    let index = -1;
    if (key) {
      index = this.overlayKeys.findIndex((item) => item.key === key);
    } else {
      index = this.overlayKeys.length - 1;
    }
    if (index !== -1) {
      const { key: _key, disappear } = this.overlayKeys[index];
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
    this.overlayKeys.push({ key });
    DeviceEventEmitter.emit('addOverlay', { key, element });
    return key;
  }

  static _remove(key) {
    const index = this.overlayKeys.findIndex((item) => item.key === key);
    if (index !== -1) {
      this.overlayKeys.splice(index, 1);
    }
    DeviceEventEmitter.emit('removeOverlay', { key });
  }

  static _removeAll() {
    this.overlayKeys = [];
    DeviceEventEmitter.emit('removeAllOverlay', {});
  }
}
