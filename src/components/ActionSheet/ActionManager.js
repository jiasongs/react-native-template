'use strict';
import React from 'react';
import ActionSheetView from './ActionSheetView';
import { OverlayManager } from '../Overlay';

const defaultOption = {
  type: 'bottom',
  modal: false,
  providerContentScale: 0.9,
  providerContentStyle: { borderRadius: 6, overflow: 'hidden' },
};

export default class ActionManager {
  static show(props = {}) {
    const { option, ...others } = props;
    const component = (
      <ActionSheetView {...others} onCancel={() => this.hide()} />
    );
    return this.showView(component, option);
  }

  static showView(component, option = {}) {
    const newOption = { ...defaultOption, ...option };
    return OverlayManager.pull(component, newOption);
  }

  static hide(key) {
    OverlayManager.hide(key);
  }
}
