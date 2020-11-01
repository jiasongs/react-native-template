'use strict';
import React from 'react';
import ToastView from './ToastView';
import { OverlayManager } from '../Overlay';

const defaultOption = {
  style: { justifyContent: 'center', alignItems: 'center' },
  type: 'none',
  modal: true,
  maskOpacity: 0.0,
  duration: 2000,
  maskPointerEvents: 'box-none',
};

export default class ToastManager {
  static toastKeys = [];

  static message(text, options) {
    if (text === 'error') {
      this.warn(text);
    } else {
      this.showView(<ToastView type={'message'} title={text} />, options);
    }
  }

  static success(text, options) {
    this.showView(<ToastView type={'success'} title={text} />, options);
  }

  static fail(text, options) {
    this.showView(<ToastView type={'fail'} title={text} />, options);
  }

  static warn(text, options) {
    this.showView(<ToastView type={'warn'} title={text} />, options);
  }

  static loading(text, options) {
    this.showView(<ToastView type={'loading'} title={text} />, {
      duration: 60000,
      modal: true,
      ...options,
    });
  }

  static showView(component, option = {}) {
    const newOption = { ...defaultOption, ...option };
    const key = OverlayManager.pop(component, newOption);
    setTimeout(() => this.hide(key), newOption.duration);
    return key;
  }

  static hide(key) {
    OverlayManager.hide(key);
  }
}
