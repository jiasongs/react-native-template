'use strict';
import React from 'react';
import AlertView from './AlertView';
import { OverlayManager, OverlayPop } from '../Overlay';

const defaultOption = {
  type: 'zoomIn',
  modal: false,
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
    OverlayManager.show(
      <OverlayPop
        ref={(view) => view && this.alertKeys.push(view)}
        onCloseRequest={() => this.hide()}
        {...newOption}
      >
        {component}
      </OverlayPop>,
    );
  }

  static hide() {
    if (this.alertKeys.length > 0) {
      const lastRef = this.alertKeys.shift();
      lastRef.close();
    }
  }
}
