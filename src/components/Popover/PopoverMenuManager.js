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

class PopoverMenuManager {
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
          fromLayout: {
            ...fillOffsetXY({ anchorPoint: option.anchorPoint, pageX, pageY }),
            width,
            height,
          },
          toLayout: null,
        };
        OverlayManager.preview(component, newOption);
      });
    } else {
      const newOption = {
        ...defaultOption,
        ...others,
        toLayout: null,
      };
      OverlayManager.preview(component, newOption);
    }
  }

  static hide(key) {
    OverlayManager.hide(key);
  }
}

function fillOffsetXY({ anchorPoint, pageX, pageY }) {
  const offset = 7;
  let x = pageX,
    y = pageY;
  switch (anchorPoint) {
    case 'left':
    case 'leftTop':
    case 'leftBottom':
      x = pageX + offset;
      break;
    case 'top':
    case 'topLeft':
    case 'topRight':
      y = pageY + offset;
      break;
    case 'bottom':
    case 'bottomLeft':
    case 'bottomRight':
      y = pageY - offset;
      break;
    case 'right':
    case 'rightTop':
    case 'rightBottom':
      x = pageX - offset;
      break;
    default:
      break;
  }
  return {
    x,
    y,
  };
}

export default PopoverMenuManager;
