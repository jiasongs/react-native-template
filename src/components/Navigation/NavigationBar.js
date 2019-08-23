'use strict';
import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useContext,
} from 'react';
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
import { Theme, ThemeContext } from '../../config/themes';
import NavigationTitle from './NavigationTitle';
import NavigationAction from './NavigationAction';

const MemoRenderBackground = React.memo(RenderImageBackground);

function RenderImageBackground(props) {
  const { backgroundImage } = props;
  return (
    backgroundImage && (
      <ImageBackground style={styles.navImageBack} source={backgroundImage} />
    )
  );
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
    backActionSource,
    title,
    extraData,
  } = props;

  const themeValue = useContext(ThemeContext);

  const defaultLeftActionRef = useRef([
    {
      icon: backActionSource,
      iconStyle: { width: 20, height: 20 },
      onPress: _onPressBackFunc,
    },
  ]);

  const [leftActionWidth, setLeftActionWidth] = useState(10);
  const [rightActionWidth, setRightActionWidth] = useState(10);

  const _onPressBackFunc = useCallback(
    (event) => {
      onPressBack && onPressBack(event);
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

  const newRenderLeftAction = useMemo(() => {
    if (extraData) {
    }
    if (renderLeftAction === undefined) {
      return defaultLeftActionRef.current;
    }
    return renderLeftAction;
  }, [extraData, renderLeftAction]);

  const buildStyles = useMemo(() => {
    const navigationBar = themeValue.navigationBar;
    return {
      style: [navigationBar.style, styles.container, style],
      statusBarStyle: navigationBar.statusBarStyle,
      titleStyle: [navigationBar.titleStyle, titleStyle],
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
        {newRenderLeftAction && (
          <NavigationAction
            style={styles.navLeftContainer}
            onLayout={onLayoutLeft}
            renderAction={newRenderLeftAction}
            extraData={extraData}
          />
        )}
        {title && (
          <NavigationTitle
            style={styles.navTitleContainer}
            title={title}
            titleStyle={buildStyles.titleStyle}
            leftActionWidth={leftActionWidth}
            rightActionWidth={rightActionWidth}
            extraData={extraData}
          />
        )}
        {renderRightAction && (
          <NavigationAction
            style={styles.navRightContainer}
            onLayout={onLayoutRight}
            renderAction={renderRightAction}
            extraData={extraData}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Theme.contentTop,
  },
  navContent: {
    marginTop: Theme.statusBarHeight,
    height: Theme.navBarHeight,
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
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
  ]),
  titleStyle: Text.propTypes.style,
  backActionSource: Image.propTypes.source,
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
