'use strict';
import React from 'react';
import AlertView from './AlertView';
import OverlayManager from '../Overlay/OverlayManager';

const defaultOption = {
  type: 'zoomOut',
  modal: false,
};

export default class AlertManager {
  static show(props = {}) {
    const { option, ...others } = props;
    const component = <AlertView {...others} />;
    return this.showView(component, option);
  }

  static showView(component, option = {}) {
    const newOption = { ...defaultOption, ...option };
    return OverlayManager.pop(component, newOption);
  }

  static hide(key) {
    OverlayManager.hide(key);
  }
}
