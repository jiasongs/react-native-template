'use strict';
import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Platform,
  Image,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import deepmerge from 'deepmerge';
import NavigationTitle from './NavigationTitle';
import NavigationAction from './NavigationAction';
import { Label } from '../Text';
import { useTheme } from '../Theme';
import { Predefine } from '../../config/predefine';

const MemoRenderBackground = React.memo(RenderImageBackground);

function RenderImageBackground(props) {
  const { backgroundImage } = props;
  return backgroundImage ? (
    <ImageBackground style={styles.navImageBack} source={backgroundImage} />
  ) : null;
}

function NavigationBar(props) {
  const {
    style,
    contentStyle,
    statusBarColor,
    statusBarStyle,
    animated,
    statusBarHidden,
    titleStyle,
    renderLeftAction,
    renderRightAction,
    backgroundImage,
    title,
    defaultInsets,
    insets,
    backTitle,
    backTitleStyle,
    backIcon,
    backIconStyle,
    onPressBack,
    extraData,
  } = props;

  const themeValue = useTheme('navigationBar');
  const [containerWidth, setContainerWidth] = useState(0);
  const [leftActionWidth, setLeftActionWidth] = useState(0);
  const [rightActionWidth, setRightActionWidth] = useState(0);

  const onLayout = useCallback((event) => {
    setContainerWidth(event.nativeEvent.layout.width);
  }, []);

  const onLayoutLeft = useCallback((event) => {
    setLeftActionWidth(event.nativeEvent.layout.width);
  }, []);

  const onLayoutRight = useCallback((event) => {
    setRightActionWidth(event.nativeEvent.layout.width);
  }, []);

  const newRenderLeftAction = useMemo(() => {
    if (extraData) {
    }
    if (typeof renderLeftAction === 'undefined') {
      return [
        {
          title: backTitle,
          titleStyle: [themeValue.backTitleStyle, backTitleStyle],
          icon: backIcon,
          iconStyle: [themeValue.backIconStyle, backIconStyle],
          onPress: onPressBack,
        },
      ];
    }
    return renderLeftAction;
  }, [
    backIcon,
    backIconStyle,
    backTitle,
    backTitleStyle,
    extraData,
    onPressBack,
    renderLeftAction,
    themeValue,
  ]);

  const buildStyles = useMemo(() => {
    const newStyle = [themeValue.style, styles.container];
    const newContentStyle = [styles.navContent];
    const newInsets = deepmerge(defaultInsets, insets);
    newContentStyle.push({
      height: Predefine.navBarHeight,
      marginTop: newInsets.top,
      marginLeft: newInsets.left,
      marginRight: newInsets.right,
      marginBottom: newInsets.bottom,
    });
    return {
      style: [newStyle, style],
      contentStyle: [newContentStyle, contentStyle],
      statusBarStyle: themeValue.statusBarStyle,
      titleStyle: [themeValue.titleStyle, titleStyle],
    };
  }, [themeValue, defaultInsets, insets, style, contentStyle, titleStyle]);

  return (
    <View style={buildStyles.style} onLayout={onLayout}>
      <StatusBar
        translucent={true}
        backgroundColor={statusBarColor}
        barStyle={statusBarStyle || buildStyles.statusBarStyle}
        animated={animated}
        hidden={statusBarHidden}
      />
      <MemoRenderBackground backgroundImage={backgroundImage} />
      <View style={buildStyles.contentStyle}>
        {newRenderLeftAction ? (
          <NavigationAction
            style={styles.navLeftContainer}
            onLayout={onLayoutLeft}
            renderAction={newRenderLeftAction}
            extraData={extraData}
          />
        ) : null}
        {title ? (
          <NavigationTitle
            style={styles.navTitleContainer}
            title={title}
            titleStyle={buildStyles.titleStyle}
            leftActionWidth={leftActionWidth}
            rightActionWidth={rightActionWidth}
            containerWidth={containerWidth}
            extraData={extraData}
          />
        ) : null}
        {renderRightAction ? (
          <NavigationAction
            style={styles.navRightContainer}
            onLayout={onLayoutRight}
            renderAction={renderRightAction}
            extraData={extraData}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  navContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitleContainer: {},
  navLeftContainer: {
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
  },
  navRightContainer: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
  },
  navImageBack: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

NavigationBar.propTypes = {
  style: ViewPropTypes.style,
  contentStyle: ViewPropTypes.style,
  title: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
  ]),
  titleStyle: Label.propTypes.style,
  renderLeftAction: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
    PropTypes.element,
  ]),
  renderRightAction: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
    PropTypes.element,
  ]),
  backgroundImage: PropTypes.number,
  backTitle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
  ]),
  backTitleStyle: Label.propTypes.style,
  backIcon: Image.propTypes.source,
  backIconStyle: Image.propTypes.style,
  onPressBack: PropTypes.func,
  statusBarStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
  statusBarColor: PropTypes.string,
  statusBarHidden: PropTypes.bool,
  defaultInsets: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    bottom: PropTypes.number,
    right: PropTypes.number,
  }),
  insets: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    bottom: PropTypes.number,
    right: PropTypes.number,
  }),
  extraData: PropTypes.any,
};

NavigationBar.defaultProps = {
  statusBarColor:
    Platform.OS === 'android' && Platform.Version > 22
      ? 'rgba(0, 0, 0, 0)'
      : 'rgba(0, 0, 0, 0.3)',
  statusBarHidden: false,
  insets: {},
  defaultInsets: {
    top: Predefine.statusBarHeight,
    left: 10,
    bottom: 0,
    right: 10,
  },
};

export default React.memo(NavigationBar);
