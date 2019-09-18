'use strict';
import React from 'react';
import PopoverMenu from './PopoverMenu';
import { OverlayManager } from '../Overlay';

const defaultOption = {
  type: 'zoomIn',
  modal: false,
};

export default class PopoverManager {
  static show(props = {}) {
    const { viewRef, option, ...others } = props;
    viewRef.measure((x, y, width, height, pageX, pageY) => {
      const newOption = {
        ...option,
        fromLayout: { x: pageX, y: pageY, width, height },
        toLayout: null,
      };
      const component = <PopoverMenu {...others} />;
      this.showView(component, newOption);
    });
  }

  static showView(component, option = {}) {
    const newOption = { ...defaultOption, ...option };
    OverlayManager.preview(component, newOption);
  }

  static hide(key) {
    OverlayManager.hide(key);
  }
}
