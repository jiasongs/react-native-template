'use strict';
import React from 'react';
import PopoverMenu from './PopoverMenu';
import { OverlayManager } from '../Overlay';

const defaultOption = {
  type: 'zoomIn',
  modal: false,
};

export default class PopoverManager {
  static showMenu(props = {}) {
    const { option, arrow, ...others } = props;
    const component = <PopoverMenu arrow={arrow} {...others} />;
    const newOption = {
      ...option,
      anchorPoint: option && option.anchorPoint ? option.anchorPoint : arrow,
    };
    this.showView(component, newOption);
  }

  static showView(component, option = {}) {
    const { viewRef, ...others } = option;
    if (viewRef) {
      viewRef.measure((x, y, width, height, pageX, pageY) => {
        const newOption = {
          ...defaultOption,
          ...others,
          fromLayout: { x: pageX, y: pageY, width, height },
          toLayout: null,
        };
        OverlayManager.preview(component, newOption);
      });
    } else {
      const newOption = {
        ...defaultOption,
        ...others,
      };
      OverlayManager.preview(component, newOption);
    }
  }

  static hide(key) {
    OverlayManager.hide(key);
  }
}
