'use strict';
import React from 'react';
import PopoverMenu from './PopoverMenu';
import { OverlayManager } from '../Overlay';

const defaultOption = {
  type: 'zoomIn',
  modal: false,
};

const defaultPopover = {
  arrowSize: 10,
  arrowPadding: 8,
};

class PopoverManager {
  static showMenu(props = {}) {
    const { option, arrow, ...others } = props;
    const newProps = { ...defaultPopover, ...others };
    const component = <PopoverMenu arrow={arrow} {...newProps} />;
    const newOption = {
      ...option,
      anchorPoint: option && option.anchorPoint ? option.anchorPoint : arrow,
      anchorOffset:
        option && option.anchorOffset
          ? option.anchorOffset
          : newProps.arrowPadding + newProps.arrowSize / 2,
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

export default PopoverManager;
