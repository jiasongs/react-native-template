'use strict';
import React, { useMemo, useState, useCallback } from 'react';
import { StyleSheet, View, ViewPropTypes, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '../Theme';

function PopoverArrow(props) {
  const {
    style,
    contentStyle,
    arrow,
    arrowSize,
    arrowPadding,
    onLayout,
    children,
    ...others
  } = props;

  const themeValue = useTheme('popover');
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const buildStyles = useMemo(() => {
    const popoverArrow = themeValue.popoverArrow;
    const newStyle = [popoverArrow.style, styles.container];
    const headerStyle = [styles.headerStyle];
    const arrowStyle = [styles.arrowStyle];
    const flattenStyle = StyleSheet.flatten([
      popoverArrow.contentStyle,
      styles.contentContainer,
      contentStyle,
    ]);
    const pixelSize = StyleSheet.hairlineWidth;
    const paddingCorner = arrowPadding;
    const halfSquareSize =
      Math.ceil(Math.sqrt(arrowSize * arrowSize * 2) / 2 / pixelSize) *
      pixelSize;
    const headerSize =
      halfSquareSize + (flattenStyle.borderWidth || StyleSheet.hairlineWidth);
    const headerPadding = headerSize - arrowSize / 2;
    const positionOffset = Platform.OS === 'ios' ? 0 : StyleSheet.hairlineWidth;
    const headerLayouts = {
      none: {},
      topLeft: {
        top: positionOffset,
        left: positionOffset,
        right: positionOffset,
        height: headerSize,
        paddingTop: headerPadding,
        alignItems: 'flex-start',
        paddingLeft: paddingCorner,
      },
      top: {
        top: positionOffset,
        left: positionOffset,
        right: positionOffset,
        height: headerSize,
        paddingTop: headerPadding,
        alignItems: 'center',
      },
      topRight: {
        top: positionOffset,
        left: positionOffset,
        right: positionOffset,
        height: headerSize,
        paddingTop: headerPadding,
        alignItems: 'flex-end',
        paddingRight: paddingCorner,
      },
      rightTop: {
        top: positionOffset,
        bottom: positionOffset,
        right: positionOffset,
        width: headerSize,
        paddingRight: headerPadding,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        paddingTop: paddingCorner,
      },
      right: {
        top: positionOffset,
        bottom: positionOffset,
        right: positionOffset,
        width: headerSize,
        paddingRight: headerPadding,
        alignItems: 'flex-end',
        justifyContent: 'center',
      },
      rightBottom: {
        top: positionOffset,
        bottom: positionOffset,
        right: positionOffset,
        width: headerSize,
        paddingRight: headerPadding,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingBottom: paddingCorner,
      },
      bottomRight: {
        bottom: positionOffset,
        left: positionOffset,
        right: positionOffset,
        height: headerSize,
        paddingBottom: headerPadding,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: paddingCorner,
      },
      bottom: {
        bottom: positionOffset,
        left: positionOffset,
        right: positionOffset,
        height: headerSize,
        paddingBottom: headerPadding,
        alignItems: 'center',
        justifyContent: 'flex-end',
      },
      bottomLeft: {
        bottom: positionOffset,
        left: positionOffset,
        right: positionOffset,
        height: headerSize,
        paddingBottom: headerPadding,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: paddingCorner,
      },
      leftBottom: {
        top: positionOffset,
        bottom: positionOffset,
        left: positionOffset,
        width: headerSize,
        paddingLeft: headerPadding,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingBottom: paddingCorner,
      },
      left: {
        top: positionOffset,
        bottom: positionOffset,
        left: positionOffset,
        width: headerSize,
        paddingLeft: headerPadding,
        alignItems: 'flex-start',
        justifyContent: 'center',
      },
      leftTop: {
        top: positionOffset,
        bottom: positionOffset,
        left: positionOffset,
        width: headerSize,
        paddingLeft: headerPadding,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: paddingCorner,
      },
    };
    const arrowLayouts = {
      none: {},
      topLeft: { transform: [{ rotate: '45deg' }] },
      top: { transform: [{ rotate: '45deg' }] },
      topRight: { transform: [{ rotate: '45deg' }] },
      rightTop: { transform: [{ rotate: '135deg' }] },
      right: { transform: [{ rotate: '135deg' }] },
      rightBottom: { transform: [{ rotate: '135deg' }] },
      bottomRight: { transform: [{ rotate: '225deg' }] },
      bottom: { transform: [{ rotate: '225deg' }] },
      bottomLeft: { transform: [{ rotate: '225deg' }] },
      leftBottom: { transform: [{ rotate: '315deg' }] },
      left: { transform: [{ rotate: '315deg' }] },
      leftTop: { transform: [{ rotate: '315deg' }] },
    };
    const popoverLayouts = {
      none: {},
      topLeft: { paddingTop: halfSquareSize },
      top: { paddingTop: halfSquareSize },
      topRight: { paddingTop: halfSquareSize },
      rightTop: { paddingRight: halfSquareSize },
      right: { paddingRight: halfSquareSize },
      rightBottom: { paddingRight: halfSquareSize },
      bottomRight: { paddingBottom: halfSquareSize },
      bottom: { paddingBottom: halfSquareSize },
      bottomLeft: { paddingBottom: halfSquareSize },
      leftBottom: { paddingLeft: halfSquareSize },
      left: { paddingLeft: halfSquareSize },
      leftTop: { paddingLeft: halfSquareSize },
    };
    let useArrow = arrow;
    switch (arrow) {
      case 'topLeft':
      case 'topRight':
        if (paddingCorner + halfSquareSize > layout.width / 2) {
          useArrow = 'top';
        }
        break;
      case 'rightTop':
      case 'rightBottom':
        if (paddingCorner + halfSquareSize > layout.height / 2) {
          useArrow = 'right';
        }
        break;
      case 'bottomRight':
      case 'bottomLeft':
        if (paddingCorner + halfSquareSize > layout.width / 2) {
          useArrow = 'bottom';
        }
        break;
      case 'leftBottom':
      case 'leftTop':
        if (paddingCorner + halfSquareSize > layout.height / 2) {
          useArrow = 'left';
        }
        break;
    }
    newStyle.push(popoverLayouts[useArrow]);
    headerStyle.push(headerLayouts[useArrow]);
    arrowStyle.push({
      backgroundColor: flattenStyle.backgroundColor,
      width: arrowSize,
      height: arrowSize,
      borderColor: flattenStyle.borderColor,
      borderTopWidth: flattenStyle.borderWidth || 0,
      borderLeftWidth: flattenStyle.borderWidth || 0,
      ...arrowLayouts[useArrow],
    });
    return {
      style: [newStyle, style],
      contentStyle: flattenStyle,
      headerStyle,
      arrowStyle,
    };
  }, [
    arrow,
    arrowPadding,
    arrowSize,
    contentStyle,
    layout.height,
    layout.width,
    style,
    themeValue,
  ]);

  const onLayoutBack = useCallback(
    (event) => {
      setLayout(event.nativeEvent.layout);
      onLayout && onLayout(event);
    },
    [onLayout],
  );

  return (
    <View {...others} style={buildStyles.style} onLayout={onLayoutBack}>
      <View style={buildStyles.contentStyle}>{children}</View>
      {arrow !== 'none' ? (
        <View style={buildStyles.headerStyle}>
          <View style={buildStyles.arrowStyle} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  contentContainer: {},
  headerStyle: {
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  arrowStyle: {},
});

PopoverArrow.propTypes = {
  style: ViewPropTypes.style,
  contentStyle: ViewPropTypes.style,
  arrow: PropTypes.oneOf([
    'none',
    'topLeft',
    'top',
    'topRight',
    'rightTop',
    'right',
    'rightBottom',
    'bottomRight',
    'bottom',
    'bottomLeft',
    'leftBottom',
    'left',
    'leftTop',
  ]),
  arrowSize: PropTypes.number,
  arrowPadding: PropTypes.number,
};

PopoverArrow.defaultProps = {
  arrow: 'none',
  arrowSize: 10,
  arrowPadding: 8,
};

export default React.memo(PopoverArrow);
