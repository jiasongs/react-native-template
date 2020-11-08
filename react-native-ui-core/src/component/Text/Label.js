'use strict';
import React, { useMemo } from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '../Theme';

function Label(props) {
  const { forwardedRef, style, title, children, ...others } = props;
  const themeValue = useTheme();

  const buildStyles = useMemo(() => {
    const primary = themeValue.primary;
    const label = themeValue.label;
    const flatStyle = StyleSheet.flatten([label.style, style]);
    if (flatStyle) {
      if (flatStyle.fontSize) {
        flatStyle.fontSize =
          flatStyle.fontSize * parseFloat(primary.font.multiple);
      }
      if (flatStyle.lineHeight) {
        flatStyle.lineHeight =
          flatStyle.lineHeight * parseFloat(primary.font.multiple);
      }
    }
    return {
      style: flatStyle,
    };
  }, [style, themeValue]);

  return (
    <Text ref={forwardedRef} style={buildStyles.style} {...others}>
      {title || children}
    </Text>
  );
}

Label.propTypes = {
  ...Text.propTypes,
  title: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Label.defaultProps = {
  ...Text.defaultProps,
};

const MemoLabel = React.memo(Label);
const ForwardLabel = React.forwardRef((props, ref) => {
  return <MemoLabel {...props} forwardedRef={ref} />;
});

ForwardLabel.propTypes = Label.propTypes;
ForwardLabel.defaultProps = Label.defaultProps;
ForwardLabel.displayName = 'Label';

export default ForwardLabel;
