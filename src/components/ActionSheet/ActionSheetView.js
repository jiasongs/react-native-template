'use strict';
import React, { useRef, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { Theme } from '../../config/themes';

function RenderTitle(props) {
  const { title, titleStyle } = props;
  if (React.isValidElement(title)) {
    return title;
  } else if (title) {
    return (
      <View style={styles.titleContainer}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </View>
    );
  }
  return null;
}

function RenderContent(props) {
  const { actions, onPress } = props;
  return (
    <ScrollView
      style={styles.scrollView}
      bounces={true}
    >
      {actions.map((item, index) => {
        const { title, titleStyle } = item;
        const borderTopWidth = index === 0 ? 0 : StyleSheet.hairlineWidth;
        return (
          <TouchableHighlight
            key={`action_item${index}`}
            style={[styles.actionContainer, { borderTopWidth }]}
            underlayColor={'#eeeeee'}
            onPress={() => onPress(item)}>
            <Text style={[styles.actionText, titleStyle]}>{title}</Text>
          </TouchableHighlight>
        );
      })}
    </ScrollView>
  );
}

function RenderCancelAction(props) {
  const { onPress } = props;
  return (
    <TouchableHighlight
      style={styles.cancelActionContainer}
      underlayColor={'#eeeeee'}
      onPress={onPress}>
      <Text style={styles.cancelActionText}>取消</Text>
    </TouchableHighlight>
  );
}

const MemoRenderTitle = React.memo(RenderTitle);
const MemoRenderContent = React.memo(RenderContent);
const MemoRenderCancelAction = React.memo(RenderCancelAction);

function ActionSheetView(props) {
  const {
    title,
    titleStyle,
    actions,
    onPress,
    onCancel,
  } = props;

  const lastActionTimeRef = useRef(0);

  const onPressAction = useCallback((actionItem) => {
    const nowTime = new Date().getTime();
    if ((nowTime - lastActionTimeRef.current) <= 200) {
      console.warn('间隔时间内重复点击了');
      return;
    }
    lastActionTimeRef.current = nowTime;
    actionItem.onPress && actionItem.onPress();
    onPress && onPress(actionItem);
  }, [onPress]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <MemoRenderTitle title={title} titleStyle={titleStyle} />
        <MemoRenderContent actions={actions} onPress={onPressAction} />
      </View>
      <View style={styles.sep} />
      <MemoRenderCancelAction onPress={onCancel} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Theme.isNotchedScreen ? Theme.screenInset.bottom : 0,
    margin: 10,
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderRadius: 6,
    overflow: 'hidden'
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(127, 127, 127, 0.3)',
    paddingVertical: 15,
  },
  title: {
    fontSize: Theme.titleFontSize,
    color: Theme.titleColor
  },
  scrollView: {
    maxHeight: Theme.actionMaxHeight,
  },
  actionContainer: {
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(127, 127, 127, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  actionText: {
    fontSize: Theme.actionTitleFontSize,
    color: Theme.actionTitleColor
  },
  sep: {
    height: 7,
    // backgroundColor: 'rgba(127, 127, 127, 0.3)',
  },
  cancelActionContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 17,
    borderRadius: 6,
  },
  cancelActionText: {
    fontSize: Theme.cancelTitleFontSize,
    color: Theme.cancelTitleColor
  },
});

ActionSheetView.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  titleStyle: Text.propTypes.style,
  actions: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string, titleStyle: Text.propTypes.style, onPress: PropTypes.func })),
  onPress: PropTypes.func,
  onCancel: PropTypes.func,
};

ActionSheetView.defaultProps = {
  actions: [],
};

export default React.memo(ActionSheetView);