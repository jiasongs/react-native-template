'use strict';
import React, { useMemo, useRef, useCallback } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import ImageView from '../Image/ImageView';

const IconPosition = {
  PositionTop: 'top',
  PositionLeft: 'left',            // imageView在titleLabel左边
  PositionBottom: 'bottom',          // imageView在titleLabel下面
  PositionRight: 'right',
};

function Button(props) {
  const {
    style,
    icon,
    iconStyle,
    iconResizeMode,
    iconPosition,
    title,
    titleStyle,
    spacingIconAndTitle,
    backgroundImage,
    clickInterval,
    onPress,
    children,
    forwardedRef,
    ...others
  } = props;

  const lastActionTimeRef = useRef(0);

  const _onPress = useCallback((event) => {
    const nowTime = new Date().getTime();
    if ((nowTime - lastActionTimeRef.current) <= clickInterval) {
      console.warn('间隔时间内重复点击了');
      return;
    }
    lastActionTimeRef.current = nowTime;
    onPress && onPress(event);
  }, [clickInterval, onPress]);

  function buildStyle() {
    const containerStyle = [styles.container];
    const buildIconStyle = [styles.iconStyle];
    const buildTitleStyle = [styles.titleStyle];
    if (icon && title) {
      containerStyle.push({ alignItems: 'center' });
      switch (iconPosition) {
        case IconPosition.PositionTop:
          buildIconStyle.push({ marginBottom: spacingIconAndTitle });
          break;
        case IconPosition.PositionBottom:
          buildIconStyle.push({ marginTop: spacingIconAndTitle });
          break;
        case IconPosition.PositionLeft:
          containerStyle.push({ flexDirection: 'row' });
          buildIconStyle.push({
            marginRight: spacingIconAndTitle,
            width: 25,
            height: 25,
          });
          break;
        case IconPosition.PositionRight:
          containerStyle.push({ flexDirection: 'row' });
          buildIconStyle.push({
            marginLeft: spacingIconAndTitle,
            width: 25,
            height: 25,
          });
          break;
        default:
          break;
      }
    }
    return { containerStyle, buildIconStyle, buildTitleStyle };
  }

  const { containerStyle, buildIconStyle, buildTitleStyle } = useMemo(buildStyle, [iconPosition, spacingIconAndTitle]);

  const iconTopOrLeft = useMemo(() => {
    return (iconPosition === IconPosition.PositionLeft || iconPosition === IconPosition.PositionTop);
  }, [iconPosition]);

  return (
    <TouchableOpacity  {...others} ref={forwardedRef} style={[containerStyle, style]} onPress={_onPress} >
      {backgroundImage && (
        <ImageBackground
          style={styles.imageBackground}
          source={backgroundImage}
        />
      )}
      {icon && iconTopOrLeft && (
        <ImageView
          style={[buildIconStyle, iconStyle]}
          resizeMode={iconResizeMode}
          source={icon}
        />
      )}
      {title && (
        <Text style={[buildTitleStyle, titleStyle]}>{title}</Text>
      )}
      {icon && !iconTopOrLeft && (
        <ImageView
          style={[buildIconStyle, iconStyle]}
          resizeMode={iconResizeMode}
          source={icon}
        />
      )}
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  iconStyle: {
    width: 40,
    height: 40,
  },
  titleStyle: {
    fontSize: 14,
    color: '#333'
  },
  imageBackground: {
    ...StyleSheet.absoluteFillObject
  }
});

Button.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({ uri: PropTypes.string })]),
  iconStyle: Image.propTypes.style,
  iconResizeMode: Image.propTypes.resizeMode,
  iconPosition: PropTypes.oneOf([
    IconPosition.PositionTop,
    IconPosition.PositionLeft,
    IconPosition.PositionBottom,
    IconPosition.PositionRight
  ]),
  title: PropTypes.string,
  titleStyle: Text.propTypes.style,
  spacingIconAndTitle: PropTypes.number,
  backgroundImage: PropTypes.number,
  activeOpacity: PropTypes.number,
  onPress: PropTypes.func,
  onPressOut: PropTypes.func,
  onLongPress: PropTypes.func,
  delayLongPress: PropTypes.number,
  disabled: PropTypes.bool,
  clickInterval: PropTypes.number, // 多次点击之间的延迟
};

Button.defaultProps = {
  ...TouchableOpacity.defaultProps,
  iconResizeMode: 'contain',
  iconPosition: IconPosition.PositionLeft,
  spacingIconAndTitle: 8,
  activeOpacity: 0.8,
  clickInterval: 300
};

export default React.memo(Button);
