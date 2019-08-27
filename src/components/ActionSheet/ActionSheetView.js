'use strict';
import React, { useRef, useCallback, useContext, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../config/theme';
import { Predefine } from '../../config/predefine';

function RenderTitle(props) {
  const { title, titleStyle } = props;
  if (React.isValidElement(title)) {
    return title;
  } else if (title) {
    return (
      <View style={styles.titleContainer}>
        <Text style={titleStyle}>{title}</Text>
      </View>
    );
  }
  return null;
}

function RenderContent(props) {
  const { actionStyle, actionTitleStyle, actions, onPress } = props;
  return (
    <ScrollView style={styles.scrollView} bounces={true}>
      {actions.map((item, index) => {
        const { title, titleStyle: itemStyle } = item;
        const borderTopWidth = index === 0 ? 0 : StyleSheet.hairlineWidth;
        return (
          <TouchableOpacity
            key={`action_item${index}`}
            style={[
              actionStyle,
              {
                borderTopWidth,
              },
            ]}
            activeOpacity={0.3}
            onPress={() => onPress(item)}
          >
            <Text style={[actionTitleStyle, itemStyle]}>{title}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

function RenderCancelAction(props) {
  const { style, titleStyle, onPress } = props;
  return (
    <TouchableOpacity style={style} activeOpacity={0.3} onPress={onPress}>
      <Text style={titleStyle}>取消</Text>
    </TouchableOpacity>
  );
}

const MemoRenderTitle = React.memo(RenderTitle);
const MemoRenderContent = React.memo(RenderContent);
const MemoRenderCancelAction = React.memo(RenderCancelAction);

function ActionSheetView(props) {
  const { title, titleStyle, actions, onPress, onCancel } = props;

  const lastActionTimeRef = useRef(0);
  const themeValue = useContext(ThemeContext);

  const onPressAction = useCallback(
    (actionItem) => {
      const nowTime = new Date().getTime();
      if (nowTime - lastActionTimeRef.current <= 200) {
        console.warn('间隔时间内重复点击了');
        return;
      }
      lastActionTimeRef.current = nowTime;
      actionItem.onPress && actionItem.onPress();
      onPress && onPress(actionItem);
    },
    [onPress],
  );

  const buildStyles = useMemo(() => {
    const sheet = themeValue.sheet;
    return {
      contentContainer: [sheet.contentStyle, styles.contentContainer],
      titleStyle: [sheet.titleStyle, styles.title, titleStyle],
      actionStyle: [sheet.actionStyle, styles.actionStyle],
      actionTitleStyle: [sheet.actionTitleStyle, styles.actionText],
      cancelActionStyle: [
        sheet.cancelActionStyle,
        styles.cancelActionContainer,
      ],
      cancelTitleStyle: [sheet.cancelTitleStyle, styles.cancelActionText],
    };
  }, [themeValue, titleStyle]);

  return (
    <View style={styles.container}>
      <View style={buildStyles.contentContainer}>
        <MemoRenderTitle title={title} titleStyle={buildStyles.titleStyle} />
        <MemoRenderContent
          actionStyle={buildStyles.actionStyle}
          actionTitleStyle={buildStyles.actionTitleStyle}
          actions={actions}
          onPress={onPressAction}
        />
      </View>
      <View style={styles.sep} />
      <MemoRenderCancelAction
        style={buildStyles.cancelActionStyle}
        titleStyle={buildStyles.cancelTitleStyle}
        onPress={onCancel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Predefine.isNotchedScreen ? Predefine.screenInset.bottom : 0,
    margin: 10,
  },
  contentContainer: {
    overflow: 'hidden',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(127, 127, 127, 0.3)',
    paddingVertical: 15,
  },
  title: {},
  scrollView: {},
  actionStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {},
  sep: {
    height: 7,
  },
  cancelActionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelActionText: {},
});

ActionSheetView.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  titleStyle: Text.propTypes.style,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      titleStyle: Text.propTypes.style,
      onPress: PropTypes.func,
    }),
  ),
  onPress: PropTypes.func,
  onCancel: PropTypes.func,
};

ActionSheetView.defaultProps = {
  actions: [],
};

export default React.memo(ActionSheetView);
