'use strict';
import React from 'react';
import { Image } from 'react-native';
import {
  TransitionSpecs,
  CardStyleInterpolators,
} from 'react-navigation-stack';

export function transitionConfig(navigation) {
  const isModal = navigation.getParam('isModal', false);
  return {
    gestureDirection: isModal ? 'vertical' : 'horizontal',
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec,
    },
    cardStyleInterpolator: (props) => {
      if (isModal) {
        return CardStyleInterpolators.forModalPresentationIOS(props);
      } else {
        return CardStyleInterpolators.forHorizontalIOS(props);
      }
    },
    headerStyleInterpolator: null,
  };
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
