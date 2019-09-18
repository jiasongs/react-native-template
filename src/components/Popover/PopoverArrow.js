'use strict';
import React, { useMemo, useState, useCallback, useContext } from 'react';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../config/theme';

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

  const themeValue = useContext(ThemeContext);
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const buildStyles = useMemo(() => {
    const popoverArrow = themeValue.popover.popoverArrow;
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
    const headerSize = halfSquareSize + flattenStyle.borderWidth;
    const headerPadding = headerSize - arrowSize / 2;
    const headerPaddingCorner = paddingCorner;
    const contentPadding = halfSquareSize;
    const headerLayouts = {
      none: {},
      topLeft: {
        top: 0,
        left: 0,
        right: 0,
        height: headerSize,
        paddingTop: headerPadding,
        alignItems: 'flex-start',
        paddingLeft: headerPaddingCorner,
      },
      top: {
        top: 0,
        left: 0,
        right: 0,
        height: headerSize,
        paddingTop: headerPadding,
        alignItems: 'center',
      },
      topRight: {
        top: 0,
        left: 0,
        right: 0,
        height: headerSize,
        paddingTop: headerPadding,
        alignItems: 'flex-end',
        paddingRight: headerPaddingCorner,
      },
      rightTop: {
        top: 0,
        bottom: 0,
        right: 0,
        width: headerSize,
        paddingRight: headerPadding,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        paddingTop: headerPaddingCorner,
      },
      right: {
        top: 0,
        bottom: 0,
        right: 0,
        width: headerSize,
        paddingRight: headerPadding,
        alignItems: 'flex-end',
        justifyContent: 'center',
      },
      rightBottom: {
        top: 0,
        bottom: 0,
        right: 0,
        width: headerSize,
        paddingRight: headerPadding,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingBottom: headerPaddingCorner,
      },
      bottomRight: {
        bottom: 0,
        left: 0,
        right: 0,
        height: headerSize,
        paddingBottom: headerPadding,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: headerPaddingCorner,
      },
      bottom: {
        bottom: 0,
        left: 0,
        right: 0,
        height: headerSize,
        paddingBottom: headerPadding,
        alignItems: 'center',
        justifyContent: 'flex-end',
      },
      bottomLeft: {
        bottom: 0,
        left: 0,
        right: 0,
        height: headerSize,
        paddingBottom: headerPadding,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: headerPaddingCorner,
      },
      leftBottom: {
        top: 0,
        bottom: 0,
        left: 0,
        width: headerSize,
        paddingLeft: headerPadding,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingBottom: headerPaddingCorner,
      },
      left: {
        top: 0,
        bottom: 0,
        left: 0,
        width: headerSize,
        paddingLeft: headerPadding,
        alignItems: 'flex-start',
        justifyContent: 'center',
      },
      leftTop: {
        top: 0,
        bottom: 0,
        left: 0,
        width: headerSize,
        paddingLeft: headerPadding,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: headerPaddingCorner,
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
      topLeft: { paddingTop: contentPadding },
      top: { paddingTop: contentPadding },
      topRight: { paddingTop: contentPadding },
      rightTop: { paddingRight: contentPadding },
      right: { paddingRight: contentPadding },
      rightBottom: { paddingRight: contentPadding },
      bottomRight: { paddingBottom: contentPadding },
      bottom: { paddingBottom: contentPadding },
      bottomLeft: { paddingBottom: contentPadding },
      leftBottom: { paddingLeft: contentPadding },
      left: { paddingLeft: contentPadding },
      leftTop: { paddingLeft: contentPadding },
    };
    let useArrow = arrow;
    switch (arrow) {
      case 'topLeft':
      case 'topRight':
        if (headerPaddingCorner + contentPadding > layout.width / 2) {
          useArrow = 'top';
        }
        break;
      case 'rightTop':
      case 'rightBottom':
        if (headerPaddingCorner + contentPadding > layout.height / 2) {
          useArrow = 'right';
        }
        break;
      case 'bottomRight':
      case 'bottomLeft':
        if (headerPaddingCorner + contentPadding > layout.width / 2) {
          useArrow = 'bottom';
        }
        break;
      case 'leftBottom':
      case 'leftTop':
        if (headerPaddingCorner + contentPadding > layout.height / 2) {
          useArrow = 'left';
        }
        break;
    }
    headerStyle.push(headerLayouts[useArrow]);
    arrowStyle.push({
      backgroundColor: flattenStyle.backgroundColor,
      width: arrowSize,
      height: arrowSize,
      borderColor: flattenStyle.borderColor,
      borderTopWidth: flattenStyle.borderWidth,
      borderLeftWidth: flattenStyle.borderWidth,
      ...arrowLayouts[useArrow],
    });
    newStyle.push(popoverLayouts[useArrow]);
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
    themeValue.popover.popoverArrow,
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
  arrowSize: 7,
  arrowPadding: 8,
};

export default React.memo(PopoverArrow);
