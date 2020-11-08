'use strict';
import React from 'react';
import SegmentedBar from './SegmentedBar';

function SegmentedScene(props) {
  return props.children;
}

SegmentedScene.propTypes = {
  ...SegmentedBar.type.propTypes,
};

SegmentedScene.defaultProps = {};

export default React.memo(SegmentedScene);
