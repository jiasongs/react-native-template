'use strict';
import React from 'react';
import { View, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import NavigationActionItem from './NavigationActionItem';
import { RenderNode } from '../Helpers';

function RenderContent(props) {
  const { renderAction, extraData } = props;
  if (Array.isArray(renderAction)) {
    return renderAction.map((item, index) => {
      return (
        <RenderNode
          key={`nav_action${index}`}
          Component={NavigationActionItem}
          Node={item}
          extraData={extraData}
          {...item}
        />
      );
    });
  }
  return <RenderNode Node={renderAction} />;
}

function NavigationAction(props) {
  const { style, onLayout, renderAction, extraData } = props;
  return (
    <View style={[styles.actionContainer, style]} onLayout={onLayout}>
      <RenderContent renderAction={renderAction} extraData={extraData} />
    </View>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

NavigationAction.propTypes = {
  style: ViewPropTypes.style,
  onLayout: PropTypes.func,
  renderAction: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
    PropTypes.element,
  ]),
  extraData: PropTypes.any,
};

NavigationAction.defaultProps = {};

export default React.memo(NavigationAction);
