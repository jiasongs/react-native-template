'use strict';
import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import OverlayPop from '../Views/OverlayPop';
import OverlayPull from '../Views/OverlayPull';
import OverlayPreview from '../Views/OverlayPreview';

let keyValue = 0;

export const AddOverlayType = '_addOverlay';
export const RemoveOverlayType = '_removeOverlay';
export const RemoveAllOverlayType = '_removeAllOverlay';

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
    return this._add(overlayView);
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
    DeviceEventEmitter.emit(AddOverlayType, { key, element });
    return key;
  }

  static _remove(key) {
    const index = this.overlayKeys.findIndex((item) => item.key === key);
    if (index !== -1) {
      this.overlayKeys.splice(index, 1);
    }
    DeviceEventEmitter.emit(RemoveOverlayType, { key });
  }

  static _removeAll() {
    this.overlayKeys = [];
    DeviceEventEmitter.emit(RemoveAllOverlayType, {});
  }
}
