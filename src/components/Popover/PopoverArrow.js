'use strict';
import React, { useMemo, useState, useCallback } from 'react';
// eslint-disable-next-line no-unused-vars
import { StyleSheet, View, ViewPropTypes } from 'react-native';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';

const Theme = {
  pixelSize: 1,
  popoverColor: '#fff',
  popoverBorderColor: 'rgba(0, 0, 0, 0.15)',
  popoverBorderRadius: 4,
  popoverBorderWidth: 1,
  popoverPaddingCorner: 8,
};

function Name(props) {
  const { style, contentStyle, arrow } = props;
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const buildStyles = useMemo(() => {
    const flattenStyle = StyleSheet.flatten([
      styles.contentContainer,
      contentStyle,
    ]);
    const paddingCorner = 8;
    const arrowSize = 7;
    let halfSquareSize = Math.sqrt(arrowSize * arrowSize * 2) / 2;
    halfSquareSize =
      Math.ceil(halfSquareSize / Theme.pixelSize) * Theme.pixelSize;
    const headerSize = halfSquareSize + flattenStyle.borderWidth;
    const headerPadding = headerSize - arrowSize / 2;
    const headerPaddingCorner = paddingCorner
      ? paddingCorner
      : Theme.popoverPaddingCorner;
    const contentPadding = halfSquareSize;

    let headerLayouts = {
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
    let arrowLayouts = {
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
    let popoverLayouts = {
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

    const headerStyle = Object.assign(
      {
        position: 'absolute',
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0)',
      },
      headerLayouts[useArrow],
    );
    const arrowStyle = Object.assign(
      {
        backgroundColor: flattenStyle.backgroundColor,
        width: arrowSize,
        height: arrowSize,
        borderColor: flattenStyle.borderColor,
        borderTopWidth: flattenStyle.borderWidth,
        borderLeftWidth: flattenStyle.borderWidth,
      },
      arrowLayouts[useArrow],
    );

    const popoverStyle = [
      { alignSelf: 'center' },
      {
        backgroundColor:
          useArrow === 'none' ? Theme.popoverColor : 'rgba(0, 0, 0, 0)',
      },
    ].concat(popoverLayouts[useArrow]);

    return {
      popoverStyle: [popoverStyle, style],
      contentStyle: [flattenStyle, { padding: 10 }],
      headerStyle,
      arrowStyle,
    };
  }, [arrow, contentStyle, layout.height, layout.width, style]);

  const onLayout = useCallback((event) => {
    setLayout(event.nativeEvent.layout);
  }, []);

  return (
    <View style={[buildStyles.popoverStyle, {}]} onLayout={onLayout}>
      <View style={buildStyles.contentStyle}>{props.children}</View>
      {!arrow || arrow === 'none' ? null : (
        <View style={[buildStyles.headerStyle]}>
          <View style={buildStyles.arrowStyle} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    backgroundColor: Theme.popoverColor,
    borderColor: Theme.popoverBorderColor,
    borderRadius: Theme.popoverBorderRadius,
    borderWidth: Theme.popoverBorderWidth,
  },
});

Name.propTypes = {};

Name.defaultProps = {};

export default Name;
