'use strict';
import React, { useMemo } from 'react';
import { View, StyleSheet, Image, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { ImageView } from '../Image';
import { Button } from '../Touchable';
import { Label } from '../Text';
import { useTheme } from '../Theme';
import { Predefine } from '../../common/predefine';
import { RenderNode } from '../Helpers';

function RenderAccessory(props) {
  const { accessory, accessorySource, accessoryStyle } = props;
  if (accessory === 'none') {
    return null;
  } else if (accessory === 'indicator') {
    return (
      <ImageView
        style={[styles.accessory, accessoryStyle]}
        source={accessorySource}
        resizeMode={'contain'}
      />
    );
  }
  return <RenderNode Node={accessory} />;
}

function RenderBottomSeparator(props) {
  const { bottomSeparator, bottomSeparatorStyle } = props;
  if (typeof bottomSeparator === 'string') {
    if (bottomSeparator === 'none') {
      return null;
    } else if (bottomSeparator === 'full') {
      return <View style={[styles.sepFull, bottomSeparatorStyle]} />;
    } else if (bottomSeparator === 'indent') {
      return <View style={[styles.sepIndent, bottomSeparatorStyle]} />;
    }
  }
  return <RenderNode Node={bottomSeparator} />;
}

const MemoRenderAccessory = React.memo(RenderAccessory);
const MemoRenderBottomSeparator = React.memo(RenderBottomSeparator);

function ListRow(props) {
  const {
    style,
    contentStyle,
    spacingIconAndTitle,
    title,
    titleStyle,
    subtitle,
    subtitleStyle,
    icon,
    iconStyle,
    detail,
    detailStyle,
    accessory,
    accessoryStyle,
    accessorySource,
    bottomSeparator,
    bottomSeparatorStyle,
    onPress,
    disabled,
  } = props;

  const themeValue = useTheme('listRow');

  const buildStyles = useMemo(() => {
    const newSubtitleStyle = [themeValue.subtitleStyle, styles.subtitleStyle];
    if (title) {
      newSubtitleStyle.push({ marginTop: 5 });
    }
    return {
      style: [themeValue.style, styles.container, style],
      titleSubtitleContainer: [
        styles.titleSubtitleContainer,
        {
          marginLeft: icon ? spacingIconAndTitle : 0,
          marginRight: spacingIconAndTitle,
        },
      ],
      iconStyle: [themeValue.iconStyle, styles.iconStyle, iconStyle],
      titleStyle: [themeValue.titleStyle, styles.titleStyle, titleStyle],
      subtitleStyle: [newSubtitleStyle, subtitleStyle],
      detailStyle: [themeValue.detailStyle, detailStyle],
      bottomSeparatorStyle: [
        themeValue.bottomSeparatorStyle,
        bottomSeparatorStyle,
      ],
    };
  }, [
    themeValue,
    title,
    style,
    icon,
    spacingIconAndTitle,
    iconStyle,
    titleStyle,
    subtitleStyle,
    detailStyle,
    bottomSeparatorStyle,
  ]);

  return (
    <Button
      hitSlop={Predefine.InsetZero}
      type={'clear'}
      style={buildStyles.style}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[styles.contentContainer, contentStyle]}>
        <View style={[Predefine.RCA, { flex: 1 }]}>
          <RenderNode
            Component={ImageView}
            Node={icon}
            style={buildStyles.iconStyle}
            source={icon}
          />
          <View style={buildStyles.titleSubtitleContainer}>
            <RenderNode
              Component={Label}
              Node={title}
              title={title}
              style={buildStyles.titleStyle}
            />
            <RenderNode
              Component={Label}
              Node={subtitle}
              title={subtitle}
              style={buildStyles.subtitleStyle}
            />
          </View>
        </View>
        <View style={[Predefine.RCC, styles.detailContainer]}>
          <RenderNode
            Component={Label}
            Node={detail}
            title={detail}
            style={buildStyles.detailStyle}
          />
          <MemoRenderAccessory
            accessoryStyle={accessoryStyle}
            accessory={accessory}
            accessorySource={accessorySource}
          />
        </View>
      </View>
      <MemoRenderBottomSeparator
        bottomSeparator={bottomSeparator}
        bottomSeparatorStyle={buildStyles.bottomSeparatorStyle}
      />
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  titleSubtitleContainer: {
    flex: 1,
  },
  titleStyle: {},
  subtitleStyle: {},
  detailContainer: {
    alignSelf: 'stretch',
  },
  iconStyle: {},
  sepFull: {
    alignSelf: 'stretch',
    height: 1,
  },
  sepIndent: {
    alignSelf: 'stretch',
    marginLeft: 15,
    height: 1,
  },
  accessory: {
    width: 12,
    height: 12,
  },
});

ListRow.propTypes = {
  style: ViewPropTypes.style,
  contentStyle: ViewPropTypes.style,
  spacingIconAndTitle: PropTypes.number,
  title: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.func,
  ]),
  titleStyle: Label.propTypes.style,
  subtitle: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.func,
  ]),
  subtitleStyle: Label.propTypes.style,
  icon: Image.propTypes.source,
  iconStyle: Image.propTypes.style,
  detail: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.func,
  ]),
  detailStyle: Label.propTypes.style,
  accessory: PropTypes.oneOfType([
    PropTypes.oneOf(['none', 'indicator']),
    PropTypes.element,
    PropTypes.func,
  ]),
  accessoryStyle: Image.propTypes.style,
  accessorySource: Image.propTypes.source,
  bottomSeparator: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.oneOf(['none', 'full', 'indent']),
  ]),
  bottomSeparatorStyle: ViewPropTypes.style,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

ListRow.defaultProps = {
  spacingIconAndTitle: 10,
  bottomSeparator: 'full',
  accessory: 'indicator',
};

export default React.memo(ListRow);
