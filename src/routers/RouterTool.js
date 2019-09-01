'use strict';
import React from 'react';
import { Image } from 'react-native';
import { StackViewTransitionConfigs } from 'react-navigation-stack';

export function transitionConfig(transitionProps, prevTransitionProps) {
  const params = transitionProps && transitionProps.scene.route.params;
  const prevParams =
    prevTransitionProps && prevTransitionProps.scene.route.params;
  let isModal = false;
  if (
    prevTransitionProps &&
    transitionProps &&
    prevTransitionProps.index > transitionProps.index
  ) {
    if (prevParams && prevParams.screenInterpolator === 'modal') {
      isModal = true;
    }
  } else if (
    prevTransitionProps &&
    transitionProps &&
    prevTransitionProps.index < transitionProps.index
  ) {
    if (params && params.screenInterpolator === 'modal') {
      isModal = true;
    }
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
