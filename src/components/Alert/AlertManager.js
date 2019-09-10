'use strict';
import React from 'react';
import AlertView from './AlertView';
import { OverlayManager } from '../Overlay';
import { OverlayPop } from '../Overlay_new';

const defaultOption = {
  type: 'zoomIn',
  modal: true,
};

export default class AlertManager {
  static alertKeys = [];

  static show(props = {}) {
    const { option, ...others } = props;
    const component = <AlertView {...others} />;
    this.showView(component, option);
  }

  static showView(component, option = {}) {
    const newOption = { ...defaultOption, ...option };
    const key = OverlayManager.show(
      <OverlayPop
        // ref={(view) => view && this.alertKeys.push(view)}
        // onCloseRequest={() => this.hide()}
        {...newOption}
      >
        {component}
      </OverlayPop>,
    );
    this.alertKeys.push(key);
  }

  static hide() {
    if (this.alertKeys.length > 0) {
      const key = this.alertKeys.shift();
      OverlayManager.hide(key);
    }
  }
}
