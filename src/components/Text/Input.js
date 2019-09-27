'use strict';
import React, { useMemo } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../Theme';

function Input(props) {
  const { style, forwardedRef, ...others } = props;
  const themeValue = useTheme();

  const buildStyles = useMemo(() => {
    const primary = themeValue.primary;
    const input = themeValue.input;
    const flatStyle = StyleSheet.flatten([input.style, style]);
    if (flatStyle && flatStyle.fontSize) {
      flatStyle.fontSize =
        flatStyle.fontSize * parseFloat(primary.font.multiple);
    }
    return {
      style: flatStyle,
    };
  }, [style, themeValue]);

  return <TextInput ref={forwardedRef} style={buildStyles.style} {...others} />;
}

Input.propTypes = {
  ...TextInput.propTypes,
};

Input.defaultProps = {
  ...TextInput.defaultProps,
};

const MemoInput = React.memo(Input);
const ForwardInput = React.forwardRef((props, ref) => {
  return <MemoInput {...props} forwardedRef={ref} />;
});

ForwardInput.propTypes = Input.propTypes;
ForwardInput.defaultProps = Input.defaultProps;
ForwardInput.displayName = 'Input';

export default ForwardInput;
