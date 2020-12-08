import React from 'react';
import PropTypes from 'prop-types';

function ComponentProxy(props) {
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

ComponentProxy.propTypes = {
  Component: PropTypes.any,
  Node: PropTypes.any,
};

ComponentProxy.defaultProps = {};

export default React.memo(ComponentProxy);
