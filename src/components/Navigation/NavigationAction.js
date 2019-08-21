'use strict';
import React from 'react';
import { View, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import NavigationActionItem from './NavigationActionItem';

function RenderContent(props) {
  const { renderAction, extraData } = props;
  if (Array.isArray(renderAction)) {
    return renderAction.map((item, index) => {
      if (!item) {
        return null;
      }
      if (React.isValidElement(item)) {
        return React.cloneElement(item, {
          key: `nav_action${index}`
        });
      }
      return <NavigationActionItem key={`nav_action${index}`} extraData={extraData} {...item} />;
    });
  } else if (typeof renderAction === 'function') {
    return renderAction();
  } else if (React.isValidElement(renderAction)) {
    return renderAction;
  }
  return null;
}

function NavigationAction(props) {
  const { style, onLayout, renderAction, extraData } = props;

  return (
    <View style={[styles.actionContainer, style]} onLayout={onLayout}>
      <RenderContent
        renderAction={renderAction}
        extraData={extraData}
      />
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
  renderAction: PropTypes.oneOfType([PropTypes.array, PropTypes.func, PropTypes.element]),
  extraData: PropTypes.any
};

NavigationAction.defaultProps = {

};

export default React.memo(NavigationAction);
