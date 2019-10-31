'use strict';
import React from 'react';
import { Image } from 'react-native';
import { StackViewTransitionConfigs } from 'react-navigation-stack';

export function transitionConfig(transitionProps, prevTransitionProps) {
  const params = transitionProps.scene.route.params || {};
  let isModal = false;
  if (
    prevTransitionProps &&
    prevTransitionProps.index > transitionProps.index
  ) {
    // 出栈操作（goBack）时，取之前栈中的props
    const prevParams = prevTransitionProps.scene.route.params || {};
    isModal = prevParams.isModal;
  } else {
    isModal = params.isModal;
  }
  return isModal
    ? StackViewTransitionConfigs.ModalSlideFromBottomIOS
    : StackViewTransitionConfigs.SlideFromRightIOS;
}

export function tabOptions(params) {
  return {
    title: params.title,
    tabBarIcon: ({ focused }) => (
      <Image
        resizeMode="contain"
        style={{
          width: params.iconWidth ? params.iconWidth : 30,
          height: params.iconHeight ? params.iconHeight : 30,
        }}
        source={!focused ? params.normalIcon : params.selectedIcon}
      />
    ),
  };
}
