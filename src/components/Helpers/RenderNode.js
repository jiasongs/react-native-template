import React from 'react';

function RenderNode(props) {
  const { Component, Node, ...others } = props;
  if (Node === null || typeof Node === 'undefined') {
    return null;
  } else if (React.isValidElement(Node)) {
    return Node;
  } else if (typeof Node === 'function') {
    return Node();
  } else {
    return <Component {...others} />;
  }
}

export default React.memo(RenderNode);
