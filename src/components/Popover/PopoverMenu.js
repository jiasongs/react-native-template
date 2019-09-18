'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import PopoverArrow from './PopoverArrow';
import PopoverMenuItem from './PopoverMenuItem';

function PopoverMenu(props) {
  const { actions, ...others } = props;
  return (
    <PopoverArrow {...others}>
      {actions.map((item, index) => {
        return (
          <PopoverMenuItem
            {...item}
            key={index}
            style={[styles.menuItem, item.style]}
          />
        );
      })}
    </PopoverArrow>
  );
}

const styles = StyleSheet.create({
  container: {},
  menuItem: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
});

PopoverMenu.propTypes = {
  ...PopoverArrow.type.propTypes,
  actions: PropTypes.arrayOf(PropTypes.shape(PopoverMenuItem.type.propTypes)),
};

PopoverMenu.defaultProps = {
  ...PopoverArrow.type.defaultProps,
  actions: [
    {
      title: 'Search',
      onPress: () => alert('Search'),
    },
    {
      title: 'Edit',

      onPress: () => alert('Edit'),
    },
    {
      title: 'Remove',
      onPress: () => alert('Remove'),
    },
  ],
};

export default React.memo(PopoverMenu);
