'use strict';
import React, { useRef, useCallback, useMemo } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '../Theme';
import { Predefine } from '../../config/predefine';
import { Label } from '../Text';
import { Button } from '../Touchable';
import { ComponentProxy } from '../Helpers';

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
            <Label style={[actionTitleStyle, itemStyle]}>{title}</Label>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const MemoRenderContent = React.memo(RenderContent);

function ActionSheetView(props) {
  const { title, titleStyle, actions, onPress, onCancel } = props;

  const lastActionTimeRef = useRef(0);
  const themeValue = useTheme('sheet');

  const onPressAction = useCallback(
    (actionItem) => {
      const nowTime = new Date().getTime();
      if (nowTime - lastActionTimeRef.current <= 200) {
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

  const buildStyles = useMemo(() => {
    return {
      style: [styles.container],
      contentContainer: [themeValue.contentStyle, styles.contentContainer],
      titleStyle: [themeValue.titleStyle, styles.title, titleStyle],
      actionStyle: [themeValue.actionStyle, styles.actionStyle],
      actionTitleStyle: [themeValue.actionTitleStyle, styles.actionText],
      cancelActionStyle: [
        themeValue.cancelActionStyle,
        styles.cancelActionContainer,
      ],
      cancelTitleStyle: [themeValue.cancelTitleStyle, styles.cancelActionText],
    };
  }, [themeValue, titleStyle]);

  return (
    <View style={buildStyles.style}>
      <View style={buildStyles.contentContainer}>
        <ComponentProxy
          Component={Label}
          title={title}
          style={buildStyles.titleStyle}
        />
        <MemoRenderContent
          actionStyle={buildStyles.actionStyle}
          actionTitleStyle={buildStyles.actionTitleStyle}
          actions={actions}
          onPress={onPressAction}
        />
      </View>
      <View style={styles.sep} />
      <Button
        type={'clear'}
        style={buildStyles.cancelActionStyle}
        title={'取消'}
        titleStyle={buildStyles.cancelTitleStyle}
        onPress={onCancel}
        activeOpacity={1.0}
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
  titleStyle: Label.propTypes.style,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      titleStyle: Label.propTypes.style,
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
