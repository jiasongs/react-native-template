'use strict';
import React from 'react';
import ActionSheetView from './ActionSheetView';
import OverlayManager from '../Overlay/OverlayManager';

const defaultOption = {
  type: 'bottom',
  modal: false,
};

export default class ActionManager {
  static show(props = {}) {
    const { option, ...others } = props;
    const component = (
      <ActionSheetView {...others} onCancel={() => this.hide()} />
    );
    this.showView(component, option);
  }

  static showView(component, option = {}) {
    const newOption = { ...defaultOption, ...option };
    OverlayManager.pull(component, newOption);
  }

  static hide() {
    OverlayManager.hide();
  }
}
