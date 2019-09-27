'use strict';
import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '../Theme';
import { Predefine } from '../../config/predefine';
import { useKeyboardSpace } from '../../common/hooks';
import { Label } from '../Text';

function RenderTitle(props) {
  const { title, titleStyle } = props;
  if (React.isValidElement(title)) {
    return title;
  } else if (typeof title === 'string' || typeof title === 'number') {
    return <Label style={[styles.title, titleStyle]}>{title}</Label>;
  }
  return null;
}

function RenderDetail(props) {
  const { detail, detailStyle } = props;
  if (React.isValidElement(detail)) {
    return detail;
  } else if (typeof detail === 'string' || typeof detail === 'number') {
    return <Label style={[styles.detail, detailStyle]}>{detail}</Label>;
  }
  return null;
}

function RenderAction(props) {
  const {
    style,
    actionStyle,
    actionTitleStyle,
    separatorStyle,
    actions,
    onPress,
  } = props;

  return (
    <View style={style}>
      {actions.map((item, index) => {
        const { title, titleStyle, actionStyle: itemStyle } = item;
        const separator = actions.length - 1 === index ? null : separatorStyle;
        return (
          <TouchableOpacity
            style={[actionStyle, separator, itemStyle]}
            key={`action_${index}`}
            onPress={() => onPress(item)}
          >
            <Label style={[actionTitleStyle, titleStyle]}>{title}</Label>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const MemoRenderTitle = React.memo(RenderTitle);
const MemoRenderDetail = React.memo(RenderDetail);
const MemoRenderAction = React.memo(RenderAction);

function AlertView(props) {
  const { title, titleStyle, detail, detailStyle, actions, onPress } = props;

  const lastActionTimeRef = useRef(0);
  const viewLayoutRef = useRef(null);
  const [keyboardSpace, setMaxY] = useKeyboardSpace(-1);
  const themeValue = useTheme('alert');

  const onPressAction = useCallback(
    (actionItem) => {
      const nowTime = new Date().getTime();
      if (nowTime - lastActionTimeRef.current <= 230) {
        // eslint-disable-next-line no-console
        console.warn('间隔时间内重复点击了');
        return;
      }
      lastActionTimeRef.current = nowTime;
      actionItem.onPress && actionItem.onPress();
      onPress && onPress(actionItem);
    },
    [onPress],
  );

  const onLayout = useCallback(
    (event) => {
      if (!viewLayoutRef.current) {
        viewLayoutRef.current = event.nativeEvent.layout;
        setMaxY(
          (Predefine.screenHeight - viewLayoutRef.current.height) / 2 +
            viewLayoutRef.current.height +
            40,
        );
      }
    },
    [setMaxY],
  );

  useEffect(() => {
    if (keyboardSpace !== -1) {
      LayoutAnimation.easeInEaseOut();
    }
  }, [keyboardSpace]);

  const buildStyles = useMemo(() => {
    return {
      style: [themeValue.style, styles.container],
      titleStyle: [themeValue.titleStyle, titleStyle],
      detailStyle: [themeValue.detailStyle, detailStyle],
      actionContainerStyle: [
        themeValue.actionContainerStyle,
        styles.actionContainer,
      ],
      actionStyle: [themeValue.actionStyle, styles.actionHighlight],
      actionTitleStyle: [themeValue.actionTitleStyle, styles.actionText],
      separatorStyle: [themeValue.separatorStyle],
    };
  }, [themeValue, titleStyle, detailStyle]);

  return (
    <View>
      <View style={buildStyles.style} onLayout={onLayout}>
        <MemoRenderTitle title={title} titleStyle={buildStyles.titleStyle} />
        <MemoRenderDetail
          detail={detail}
          detailStyle={buildStyles.detailStyle}
        />
        <MemoRenderAction
          style={buildStyles.actionContainerStyle}
          actionStyle={buildStyles.actionStyle}
          actionTitleStyle={buildStyles.actionTitleStyle}
          separatorStyle={buildStyles.separatorStyle}
          actions={actions}
          onPress={onPressAction}
        />
      </View>
      <View style={{ height: keyboardSpace }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  title: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  detail: {
    marginTop: 13,
    marginHorizontal: 20,
  },
  actionContainer: {
    marginTop: 17,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionHighlight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  actionText: {},
  separator: {},
});

AlertView.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  titleStyle: Label.propTypes.style,
  detail: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  detailStyle: Label.propTypes.style,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      titleStyle: Label.propTypes.style,
      onPress: PropTypes.func,
    }),
  ),
  onPress: PropTypes.func,
};

AlertView.defaultProps = {
  actions: [],
};

export default React.memo(AlertView);
