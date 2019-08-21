'use strict';
import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation } from 'react-native';
import PropTypes from 'prop-types';
import { Theme } from '../../config/themes';
import { useKeyboardSpace } from '../../common/hook';

function RenderTitle(props) {
  const { title, titleStyle } = props;
  if (React.isValidElement(title)) {
    return title;
  } else if (typeof title == 'string' || typeof title == 'number') {
    return <Text style={[styles.title, titleStyle]}>{title}</Text>;
  }
  return null;
}

function RenderDetail(props) {
  const { detail, detailStyle } = props;
  if (React.isValidElement(detail)) {
    return detail;
  } else if (typeof detail == 'string' || typeof detail == 'number') {
    return <Text style={[styles.detail, detailStyle]}>{detail}</Text>;
  }
  return null;
}

function RenderAction(props) {
  const { actions, onPress } = props;

  const buildStyle = useMemo(() => {
    return (index) => {
      let separator;
      if (actions.length === 1) {
        separator = null;
      } else {
        separator = actions.length - 1 === index ? null : styles.separator;
      }
      return separator;
    };
  }, [actions]);

  if (actions.length === 0) {
    return null;
  }
  return (
    <View style={styles.actionContainer}>
      {actions.map((item, index) => {
        const { title, titleStyle, actionStyle } = item;
        return (
          <TouchableOpacity
            style={[styles.actionHighlight, actionStyle, buildStyle(index)]}
            key={`action_${index}`}
            onPress={() => onPress(item)}>
            <Text style={[styles.actionText, titleStyle]}>
              {title}
            </Text>
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
  const {
    title,
    titleStyle,
    detail,
    detailStyle,
    actions,
    onPress
  } = props;

  const lastActionTimeRef = useRef(0);
  const viewLayoutRef = useRef(null);
  const [keyboardSpace, setMaxY] = useKeyboardSpace(-1);

  const onPressAction = useCallback((actionItem) => {
    const nowTime = new Date().getTime();
    if ((nowTime - lastActionTimeRef.current) <= 230) {
      console.warn('间隔时间内重复点击了');
      return;
    }
    lastActionTimeRef.current = nowTime;
    actionItem.onPress && actionItem.onPress();
    onPress && onPress(actionItem);
  }, [onPress]);

  const onLayout = useCallback((event) => {
    if (!viewLayoutRef.current) {
      viewLayoutRef.current = event.nativeEvent.layout;
      setMaxY((Theme.screenHeight - viewLayoutRef.current.height) / 2 + viewLayoutRef.current.height + 40);
    }
  }, [setMaxY]);

  useEffect(() => {
    if (keyboardSpace != -1) {
      LayoutAnimation.easeInEaseOut();
    }
  }, [keyboardSpace]);

  return (
    <View>
      <View style={styles.container} onLayout={onLayout}>
        <MemoRenderTitle title={title} titleStyle={titleStyle} />
        <MemoRenderDetail detail={detail} detailStyle={detailStyle} />
        <MemoRenderAction actions={actions} onPress={onPressAction} />
      </View>
      <View style={{ height: keyboardSpace }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Theme.alertWidth,
    minHeight: Theme.alertMinHeight,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
  },
  title: {
    marginTop: 20,
    maxWidth: Theme.alertTitleMaxWidth,
    fontSize: Theme.alertTitleFontSize,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Theme.alertTitleColor,
  },
  detail: {
    marginTop: 12,
    maxWidth: Theme.alertDetailMaxWidth,
    textAlign: 'center',
    fontSize: Theme.alertDetailFontSize,
    lineHeight: 20,
    color: Theme.alertDetailColor,
  },
  actionContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Theme.alertWidth,
    height: Theme.alertActionHeight,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: Theme.alertSeparatorColor,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#dbdbdb',
  },
  actionHighlight: {
    flex: 1,
    height: Theme.alertActionHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  actionText: {
    color: Theme.alertActionColor,
    fontSize: Theme.alertActionFontSize,
  },
  separator: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: Theme.alertSeparatorColor,
  },
});

AlertView.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  titleStyle: Text.propTypes.style,
  detail: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  detailStyle: Text.propTypes.style,
  actions: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string, titleStyle: Text.propTypes.style, onPress: PropTypes.func })),
  onPress: PropTypes.func
};

AlertView.defaultProps = {
  actions: []
};

export default React.memo(AlertView);