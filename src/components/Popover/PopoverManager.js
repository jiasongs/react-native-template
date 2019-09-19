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
    const { viewRef, option, arrow, ...others } = props;
    const component = <PopoverMenu arrow={arrow} {...others} />;
    if (viewRef) {
      viewRef.measure((x, y, width, height, pageX, pageY) => {
        const newOption = {
          ...option,
          anchorPoint:
            option && option.anchorPoint ? option.anchorPoint : arrow,
          fromLayout: { x: pageX, y: pageY, width, height },
          toLayout: null,
        };
        this.showView(component, newOption);
      });
    } else {
      const newOption = {
        ...option,
        anchorPoint: option && option.anchorPoint ? option.anchorPoint : arrow,
      };
      this.showView(component, newOption);
    }
  }

  static showView(component, option = {}) {
    const newOption = {
      ...defaultOption,
      ...option,
    };
    OverlayManager.preview(component, newOption);
  }

  static hide(key) {
    OverlayManager.hide(key);
  }
}
