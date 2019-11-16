import React from 'react';
import PropTypes from 'prop-types';

function RenderNode(props) {
  const { Component, Node, ...others } = props;
  if (React.isValidElement(Node)) {
    return Node;
  } else if (typeof Node === 'function') {
    return Node();
  } else if (!Component || Node === null || typeof Node === 'undefined') {
    return null;
  } else {
    return <Component {...others} />;
  }
}

RenderNode.propTypes = {
  Component: PropTypes.any,
  Node: PropTypes.any,
};

RenderNode.defaultProps = {};

export default React.memo(RenderNode);
