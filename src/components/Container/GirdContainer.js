'use strict';
import React, { useMemo, useState, useCallback } from 'react';
import { View, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

function GirdContainer(props) {
  const {
    style,
    numColumns,
    itemColumnMargin,
    itemRowMargin,
    children,
  } = props;
  const [containerWidth, setContainerWidth] = useState(0);

  const onLayout = useCallback((event) => {
    const layout = event.nativeEvent.layout;
    setContainerWidth(layout.width);
  }, []);

  const wrapItemWidth = useMemo(() => {
    return Math.floor(
      (containerWidth - itemColumnMargin * (numColumns - 1)) / numColumns,
    );
  }, [containerWidth, itemColumnMargin, numColumns]);

  return (
    <View style={[styles.girdContainer, style]} onLayout={onLayout}>
      {children.map((element, index) => {
        const marginLeft = index % numColumns === 0 ? 0 : itemColumnMargin;
        const marginTop = index < numColumns ? 0 : itemRowMargin;
        return React.cloneElement(element, {
          style: [
            {
              width: wrapItemWidth,
              marginLeft,
              marginTop,
            },
            element.props.style,
          ],
        });
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  girdContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

GirdContainer.propTypes = {
  style: ViewPropTypes.style, // 最外层的样式
  numColumns: PropTypes.number.isRequired,
  itemColumnMargin: PropTypes.number, // 列间距
  itemRowMargin: PropTypes.number, // 行间距
  extraData: PropTypes.any,
};

GirdContainer.defaultProps = {
  itemColumnMargin: 0,
  itemRowMargin: 0,
};

export default React.memo(GirdContainer);
