'use strict';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '../Touchable';

function PopoverMenuItem(props) {
  const { style } = props;

  const buildStyles = useMemo(() => {
    return {
      style: [styles.menuItem, style],
    };
  }, [style]);

  return <Button {...props} style={buildStyles.style} />;
}

const styles = StyleSheet.create({
  menuItem: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 18,
  },
});

PopoverMenuItem.propTypes = {
  ...Button.propTypes,
};

PopoverMenuItem.defaultProps = {
  type: 'clear',
};

export default React.memo(PopoverMenuItem);
