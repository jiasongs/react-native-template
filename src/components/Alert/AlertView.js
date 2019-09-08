'use strict';
import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../config/theme';
import { Predefine } from '../../config/predefine';
import { useKeyboardSpace } from '../../common/hooks';

function RenderTitle(props) {
  const { title, titleStyle } = props;
  if (React.isValidElement(title)) {
    return title;
  } else if (typeof title === 'string' || typeof title === 'number') {
    return <Text style={[styles.title, titleStyle]}>{title}</Text>;
  }
  return null;
}

function RenderDetail(props) {
  const { detail, detailStyle } = props;
  if (React.isValidElement(detail)) {
    return detail;
  } else if (typeof detail === 'string' || typeof detail === 'number') {
    return <Text style={[styles.detail, detailStyle]}>{detail}</Text>;
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
            <Text style={[actionTitleStyle, titleStyle]}>{title}</Text>
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
  const themeValue = useContext(ThemeContext);

  const onPressAction = useCallback(
    (actionItem) => {
      const nowTime = new Date().getTime();
      if (nowTime - lastActionTimeRef.current <= 230) {
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
    const alert = themeValue.alert;
    return {
      style: [alert.style, styles.container],
      titleStyle: [alert.titleStyle, titleStyle],
      detailStyle: [alert.detailStyle, detailStyle],
      actionContainerStyle: [
        alert.actionContainerStyle,
        styles.actionContainer,
      ],
      actionStyle: [alert.actionStyle, styles.actionHighlight],
      actionTitleStyle: [alert.actionTitleStyle, styles.actionText],
      separatorStyle: [alert.separatorStyle],
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
    paddingTop: 10,
  },
  title: {
    marginVertical: 10,
    // marginTop: 20,
  },
  detail: {
    marginVertical: 10,
    // marginTop: 12,
  },
  actionContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionHighlight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {},
  separator: {},
});

AlertView.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  titleStyle: Text.propTypes.style,
  detail: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  detailStyle: Text.propTypes.style,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      titleStyle: Text.propTypes.style,
      onPress: PropTypes.func,
    }),
  ),
  onPress: PropTypes.func,
};

AlertView.defaultProps = {
  actions: [],
};

export default React.memo(AlertView);
