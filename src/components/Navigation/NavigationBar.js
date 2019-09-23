'use strict';
import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import NavigationTitle from './NavigationTitle';
import NavigationAction from './NavigationAction';
import { useTheme } from '../../config/theme';
import { Predefine } from '../../config/predefine';
// 考虑引入是否合理
import RouterHelper from '../../routers/RouterHelper';

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
    statusBarColor,
    statusBarStyle,
    animated,
    statusBarHidden,
    onPressBack,
    titleStyle,
    renderLeftAction,
    renderRightAction,
    backgroundImage,
    defaultLeftSource,
    title,
    extraData,
  } = props;

  const themeValue = useTheme('navigationBar');

  const [leftActionWidth, setLeftActionWidth] = useState(10);
  const [rightActionWidth, setRightActionWidth] = useState(10);

  const _onPressBackFunc = useCallback(
    (event) => {
      if (onPressBack) {
        onPressBack(event);
      } else {
        RouterHelper.goBack();
      }
    },
    [onPressBack],
  );

  const onLayoutLeft = useCallback((event) => {
    const width = event.nativeEvent.layout.width;
    setLeftActionWidth(width);
  }, []);

  const onLayoutRight = useCallback((event) => {
    const width = event.nativeEvent.layout.width;
    setRightActionWidth(width);
  }, []);

  const defaultLeftAction = useMemo(() => {
    const action = themeValue.defaultLeftAction;
    return [
      {
        icon: defaultLeftSource,
        iconStyle: [{ width: 20, height: 20 }, action.iconStyle],
        onPress: _onPressBackFunc,
      },
    ];
  }, [_onPressBackFunc, defaultLeftSource, themeValue]);

  const newRenderLeftAction = useMemo(() => {
    if (extraData) {
    }
    if (renderLeftAction === undefined) {
      return defaultLeftAction;
    }
    return renderLeftAction;
  }, [defaultLeftAction, extraData, renderLeftAction]);

  const buildStyles = useMemo(() => {
    return {
      style: [themeValue.style, styles.container, style],
      statusBarStyle: themeValue.statusBarStyle,
      titleStyle: [themeValue.titleStyle, titleStyle],
    };
  }, [themeValue, style, titleStyle]);

  return (
    <View style={buildStyles.style}>
      <StatusBar
        translucent={true}
        backgroundColor={statusBarColor}
        barStyle={statusBarStyle || buildStyles.statusBarStyle}
        animated={animated}
        hidden={statusBarHidden}
      />
      <MemoRenderBackground backgroundImage={backgroundImage} />
      <View style={styles.navContent}>
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
    height: Predefine.contentTop,
  },
  navContent: {
    marginTop: Predefine.statusBarHeight,
    height: Predefine.navBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitleContainer: {},
  navLeftContainer: {
    position: 'absolute',
    left: 5,
    justifyContent: 'center',
  },
  navRightContainer: {
    position: 'absolute',
    right: 5,
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
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
  ]),
  titleStyle: Text.propTypes.style,
  defaultLeftSource: Image.propTypes.source,
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
  statusBarStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
  statusBarColor: PropTypes.string,
  statusBarHidden: PropTypes.bool,
  extraData: PropTypes.any,
};

NavigationBar.defaultProps = {
  statusBarColor:
    Platform.OS === 'android' && Platform.Version > 22
      ? 'rgba(0, 0, 0, 0)'
      : 'rgba(0, 0, 0, 0.3)',
  statusBarHidden: false,
};

export default React.memo(NavigationBar);
