'use strict';
import React, { useRef, useCallback, useMemo, useEffect } from 'react';
import { ViewPropTypes } from 'react-native';
import PopoverMenu from './PopoverMenu';
import PopoverMenuManager from './PopoverMenuManager';
import { Button } from '../Touchable';

function PopoverPreview(props) {
  const {
    style,
    menuStyle,
    menuContentStyle,
    menuType,
    arrow,
    menuActions,
    menuChildren,
    children,
    arrowSize,
    arrowPadding,
    option,
    onPress,
    onLongPress,
    forwardedRef,
    ...others
  } = props;

  const viewRef = useRef();

  const showMenu = useCallback(() => {
    PopoverMenuManager.showMenu({
      style: menuStyle,
      contentStyle: menuContentStyle,
      arrow: arrow,
      arrowSize,
      arrowPadding,
      type: menuType,
      actions: menuActions,
      children: menuChildren,
      option: {
        viewRef: viewRef.current,
        ...option,
      },
    });
  }, [
    arrow,
    arrowPadding,
    arrowSize,
    menuActions,
    menuChildren,
    menuContentStyle,
    menuStyle,
    menuType,
    option,
  ]);

  const onPressBack = useCallback(() => {
    if (onPress) {
      onPress && onPress();
    } else {
      showMenu();
    }
  }, [onPress, showMenu]);

  const onLongPressBack = useCallback(() => {
    if (onLongPress) {
      onLongPress && onLongPress();
    } else {
      showMenu();
    }
  }, [onLongPress, showMenu]);

  const buildStyles = useMemo(() => {
    return {
      style: [style],
    };
  }, [style]);

  useEffect(() => {
    props.forwardedRef = viewRef.current;
  }, [props.forwardedRef]);

  return (
    <Button
      {...others}
      style={buildStyles.style}
      ref={viewRef}
      onPress={onPressBack}
      onLongPress={onLongPressBack}
    >
      {children}
    </Button>
  );
}

PopoverPreview.propTypes = {
  style: ViewPropTypes.style,
  menuStyle: ViewPropTypes.style,
  menuContentStyle: ViewPropTypes.style,
  menuType: PopoverMenu.type.propTypes.type,
  menuActions: PopoverMenu.type.propTypes.actions,
};

PopoverPreview.defaultProps = {
  arrow: 'none',
  arrowSize: 10,
  arrowPadding: 8,
  menuType: 'none',
  menuActions: [],
};

const MemoPopoverPreview = React.memo(PopoverPreview);
const ForwardPopoverPreview = React.forwardRef((props, ref) => {
  return <MemoPopoverPreview {...props} forwardedRef={ref} />;
});

ForwardPopoverPreview.propTypes = PopoverPreview.propTypes;
ForwardPopoverPreview.defaultProps = PopoverPreview.defaultProps;
ForwardPopoverPreview.displayName = 'PopoverPreview';

export default ForwardPopoverPreview;
