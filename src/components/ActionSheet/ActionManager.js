'use strict';
import React from 'react';
import ActionSheetView from './ActionSheetView';
import { OverlayManager, OverlayPull } from '../Overlay';

const defaultOption = {
  type: 'bottom',
  modal: false,
  overlayOpacity: 0.3,
};

export default class ActionManager {
  static actionKeys = [];

  static show(props = {}) {
    const { option, ...others } = props;
    const component = (
      <ActionSheetView {...others} onCancel={() => this.hide()} />
    );
    this.showView(component, option);
  }

  static showView(component, option = {}) {
    const newOption = { ...defaultOption, ...option };
    OverlayManager.show(
      <OverlayPull
        ref={(view) => view && this.actionKeys.push(view)}
        onCloseRequest={() => this.hide()}
        {...newOption}
      >
        {component}
      </OverlayPull>,
    );
  }

  static hide() {
    if (this.actionKeys.length > 0) {
      const lastRef = this.actionKeys.pop();
      lastRef.close();
    }
  }
}
