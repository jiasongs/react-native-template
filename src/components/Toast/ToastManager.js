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
  maskPointerEvents: 'box-only',
};

export default class ToastManager {
  static toastKeys = [];

  static message(text, options) {
    if (text === 'error') {
      this.warn(text);
    } else {
      this.showView(<ToastView type={'message'} text={text} />, options);
    }
  }

  static success(text, options) {
    this.showView(<ToastView type={'success'} text={text} />, options);
  }

  static fail(text, options) {
    this.showView(<ToastView type={'fail'} text={text} />, options);
  }

  static warn(text, options) {
    this.showView(<ToastView type={'warn'} text={text} />, options);
  }

  static loading(text, options) {
    this.showView(<ToastView type={'loading'} text={text} />, {
      duration: 60000,
      modal: true,
      ...options,
    });
  }

  static showView(component, option = {}) {
    const newOption = { ...defaultOption, ...option };
    setTimeout(() => this.hide(), newOption.duration);
    return OverlayManager.pop(component, newOption);
  }

  static hide(key) {
    OverlayManager.hide(key);
  }
}
