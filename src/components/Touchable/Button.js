'use strict';
import React, { useMemo, useRef, useCallback } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import ImageView from '../Image/ImageView';
import { Label } from '../Text';
import { useTheme } from '../../config/theme';

const IconPosition = {
  PositionTop: 'top',
  PositionLeft: 'left', // imageView在titleLabel左边
  PositionBottom: 'bottom', // imageView在titleLabel下面
  PositionRight: 'right',
};

function Button(props) {
  const {
    style,
    type,
    raised,
    icon,
    iconStyle,
    iconPosition,
    title,
    titleStyle,
    spacingIconAndTitle,
    backgroundImage,
    clickInterval,
    onPress,
    children,
    forwardedRef,
    disabled,
    disabledStyle,
    disabledTitleStyle,
    loading,
    loadingStyle,
    ...others
  } = props;

  const lastActionTimeRef = useRef(0);
  const themeValue = useTheme('button');

  const _onPress = useCallback(
    (event) => {
      const nowTime = new Date().getTime();
      if (nowTime - lastActionTimeRef.current <= clickInterval) {
        console.warn('间隔时间内重复点击了');
        return;
      }
      lastActionTimeRef.current = nowTime;
      onPress && onPress(event);
    },
    [clickInterval, onPress],
  );

  const buildStyles = useMemo(() => {
    const newStyle = [],
      newTitleStyle = [],
      newIconStyle = [],
      newLoadingStyle = [];
    if (type === 'solid') {
      newStyle.push(themeValue.solid.style);
      newTitleStyle.push(themeValue.solid.titleStyle);
      newIconStyle.push(themeValue.solid.iconStyle);
      if (loading) {
        newLoadingStyle.push(themeValue.solid.loadingStyle);
      }
      if (disabled) {
        newStyle.push(themeValue.solid.disabledStyle);
        newTitleStyle.push(themeValue.solid.disabledTitleStyle);
      }
      if (raised) {
        newStyle.push(themeValue.raisedStyle);
      }
    } else if (type === 'outline') {
      newStyle.push(themeValue.outline.style);
      newTitleStyle.push(themeValue.outline.titleStyle);
      newIconStyle.push(themeValue.outline.iconStyle);
      if (loading) {
        newLoadingStyle.push(themeValue.outline.loadingStyle);
      }
      if (disabled) {
        newStyle.push(themeValue.outline.disabledStyle);
        newTitleStyle.push(themeValue.outline.disabledTitleStyle);
      }
      if (raised) {
        newStyle.push(themeValue.raisedStyle);
      }
    } else if (type === 'clear') {
      newStyle.push(themeValue.clear.style);
      newTitleStyle.push(themeValue.clear.titleStyle);
      newIconStyle.push(themeValue.clear.iconStyle);
      if (loading) {
        newLoadingStyle.push(themeValue.clear.loadingStyle);
      }
      if (disabled) {
        newStyle.push(themeValue.clear.disabledStyle);
        newTitleStyle.push(themeValue.clear.disabledTitleStyle);
      }
    }
    const buildStyle = [...newStyle, styles.container];
    const buildTitleStyle = [...newTitleStyle, styles.titleStyle];
    const buildIconStyle = [...newIconStyle, styles.iconStyle];
    if (icon && title) {
      buildStyle.push({ alignItems: 'center' });
      switch (iconPosition) {
        case IconPosition.PositionTop:
          type !== 'clear' && buildStyle.push({ paddingVertical: 15 });
          buildIconStyle.push({
            marginBottom: spacingIconAndTitle,
            ...themeValue.iconVerticalStyle,
          });
          break;
        case IconPosition.PositionBottom:
          type !== 'clear' && buildStyle.push({ paddingVertical: 15 });
          buildIconStyle.push({
            marginTop: spacingIconAndTitle,
            ...themeValue.iconVerticalStyle,
          });
          break;
        case IconPosition.PositionLeft:
          buildStyle.push({ flexDirection: 'row' });
          buildIconStyle.push({
            marginRight: spacingIconAndTitle,
            ...themeValue.iconHorizontalStyle,
          });
          break;
        case IconPosition.PositionRight:
          buildStyle.push({ flexDirection: 'row' });
          buildIconStyle.push({
            marginLeft: spacingIconAndTitle,
            ...themeValue.iconHorizontalStyle,
          });
          break;
        default:
          break;
      }
    }
    let loadingFlatten = {};
    if (loading) {
      buildTitleStyle.push({ opacity: 0 });
      buildIconStyle.push({ opacity: 0 });
      loadingFlatten = StyleSheet.flatten([...newLoadingStyle, loadingStyle]);
    }
    return {
      style: [...buildStyle, style, disabled ? disabledStyle : null],
      iconStyle: [...buildIconStyle, iconStyle],
      titleStyle: [
        ...buildTitleStyle,
        titleStyle,
        disabled ? disabledTitleStyle : null,
      ],
      loadingStyle: loadingFlatten,
      loadingColor: loadingFlatten.color,
      loadingSize: loadingFlatten.size,
    };
  }, [
    disabled,
    disabledStyle,
    disabledTitleStyle,
    icon,
    iconPosition,
    iconStyle,
    loading,
    loadingStyle,
    raised,
    spacingIconAndTitle,
    style,
    themeValue,
    title,
    titleStyle,
    type,
  ]);

  const iconTopOrLeft = useMemo(() => {
    return (
      iconPosition === IconPosition.PositionLeft ||
      iconPosition === IconPosition.PositionTop
    );
  }, [iconPosition]);

  return (
    <TouchableOpacity
      {...others}
      ref={forwardedRef}
      style={buildStyles.style}
      onPress={_onPress}
      disabled={loading || disabled}
    >
      {backgroundImage ? (
        <ImageBackground
          style={styles.imageBackground}
          source={backgroundImage}
        />
      ) : null}
      {icon && iconTopOrLeft ? (
        <ImageView style={buildStyles.iconStyle} source={icon} />
      ) : null}
      {title ? <Label style={buildStyles.titleStyle}>{title}</Label> : null}
      {icon && !iconTopOrLeft ? (
        <ImageView style={buildStyles.iconStyle} source={icon} />
      ) : null}
      {children}
      {loading ? (
        <ActivityIndicator
          style={buildStyles.loadingStyle}
          color={buildStyles.loadingColor}
          size={buildStyles.loadingSize}
          animating={loading}
          hidesWhenStopped={true}
        />
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    resizeMode: 'contain',
  },
  titleStyle: {},
  imageBackground: {
    ...StyleSheet.absoluteFillObject,
  },
});

Button.propTypes = {
  ...TouchableOpacity.propTypes,
  type: PropTypes.oneOf(['solid', 'clear', 'outline']),
  icon: Image.propTypes.source,
  iconStyle: Image.propTypes.style,
  iconPosition: PropTypes.oneOf([
    IconPosition.PositionTop,
    IconPosition.PositionLeft,
    IconPosition.PositionBottom,
    IconPosition.PositionRight,
  ]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  titleStyle: Label.propTypes.style,
  spacingIconAndTitle: PropTypes.number,
  backgroundImage: PropTypes.number,
  disabled: PropTypes.bool,
  disabledStyle: ViewPropTypes.style,
  disabledTitleStyle: Label.propTypes.style,
  loading: PropTypes.bool,
  loadingStyle: ViewPropTypes.style,
  raised: PropTypes.bool,
  clickInterval: PropTypes.number, // 多次点击之间的延迟
};

Button.defaultProps = {
  ...TouchableOpacity.defaultProps,
  type: 'solid',
  iconPosition: IconPosition.PositionLeft,
  spacingIconAndTitle: 8,
  activeOpacity: 0.8,
  clickInterval: 300,
  hitSlop: { top: 10, left: 10, bottom: 10, right: 10 },
  raised: false,
};

const MemoButton = React.memo(Button);
const ForwardButton = React.forwardRef((props, ref) => {
  return <MemoButton {...props} forwardedRef={ref} />;
});

ForwardButton.propTypes = Button.propTypes;
ForwardButton.defaultProps = Button.defaultProps;
ForwardButton.displayName = 'Button';

export default ForwardButton;
