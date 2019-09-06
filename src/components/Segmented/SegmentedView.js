'use strict';
import React from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import PropTypes from 'prop-types';
import SegmentedBar from './SegmentedBar';
import SceneView from './SceneView';

function ContentView(props) {
  const { children } = props;
  return (
    <ScrollView
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={true}
      scrollEventThrottle={16}
    >
      {React.Children.map(children, (item, index) => {
        return <SceneView key={`page_${item.key || index}`} />;
      })}
    </ScrollView>
  );
}

function SegmentedView() {
  return (
    <View style={styles.container}>
      <SegmentedBar />
      <ContentView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

SegmentedView.propTypes = {};

SegmentedView.defaultProps = {};

export default React.memo(SegmentedView);
