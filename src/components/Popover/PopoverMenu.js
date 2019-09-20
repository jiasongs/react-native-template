'use strict';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import PopoverArrow from './PopoverArrow';
import PopoverMenuItem from './PopoverMenuItem';

function PopoverMenu(props) {
  const { type, actions, style, contentStyle, children, ...others } = props;

  const buildStyles = useMemo(() => {
    const newContentStyle = [];
    switch (type) {
      case 'vertical':
        newContentStyle.push(styles.verticalContentStyle);
        break;
      case 'horizontal':
        newContentStyle.push(styles.horizontalContentStyle);
        break;
      default:
        break;
    }
    return {
      style: [style],
      contentStyle: [newContentStyle, contentStyle],
    };
  }, [contentStyle, style, type]);

  return (
    <PopoverArrow
      style={buildStyles.style}
      contentStyle={buildStyles.contentStyle}
      {...others}
    >
      {actions.map((item, index) => {
        const itemStyle = [];
        if (index < actions.length - 1) {
          itemStyle.push(
            type === 'vertical'
              ? styles.verticalItemSep
              : styles.horizontalItemSep,
          );
        }
        return (
          <PopoverMenuItem
            {...item}
            key={index}
            style={[itemStyle, item.style]}
          />
        );
      })}
      {children}
    </PopoverArrow>
  );
}

const styles = StyleSheet.create({
  verticalContentStyle: {
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
  horizontalContentStyle: {
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  verticalItemSep: {
    borderBottomColor: '#ddd',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  horizontalItemSep: {
    borderRightColor: '#ddd',
    borderRightWidth: StyleSheet.hairlineWidth,
  },
});

PopoverMenu.propTypes = {
  ...PopoverArrow.type.propTypes,
  type: PropTypes.oneOf(['none', 'vertical', 'horizontal']),
  actions: PropTypes.arrayOf(PropTypes.shape(PopoverMenuItem.type.propTypes)),
};

PopoverMenu.defaultProps = {
  ...PopoverArrow.type.defaultProps,
  type: 'vertical',
  actions: [],
};

export default React.memo(PopoverMenu);
