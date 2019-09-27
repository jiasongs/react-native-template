'use strict';
import React, { useMemo } from 'react';
import { View, StyleSheet, Image, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import ImageView from '../Image/ImageView';
import { Button } from '../Touchable';
import { Label } from '../Text';
import { useTheme } from '../../config/theme';
import { Predefine } from '../../config/predefine';

function RenderIcon(props) {
  const { icon, iconStyle } = props;
  if (React.isValidElement(icon)) {
    return icon;
  } else if (typeof icon === 'function') {
    return icon();
  } else if (typeof icon === 'number' || typeof icon === 'object') {
    return <ImageView style={iconStyle} source={icon} />;
  }
  return null;
}

function RenderTitle(props) {
  const { title, titleStyle } = props;
  if (React.isValidElement(title)) {
    return title;
  } else if (typeof title === 'function') {
    return title();
  } else if (typeof title === 'string') {
    return <Label style={titleStyle}>{title}</Label>;
  }
  return null;
}

function RenderSubtitle(props) {
  const { subtitle, subtitleStyle } = props;

  if (React.isValidElement(subtitle)) {
    return subtitle;
  } else if (typeof subtitle === 'function') {
    return subtitle();
  } else if (typeof subtitle === 'string') {
    return <Label style={subtitleStyle}>{subtitle}</Label>;
  }
  return null;
}

function RenderDetail(props) {
  const { detail, detailStyle } = props;
  if (React.isValidElement(detail)) {
    return detail;
  } else if (typeof detail === 'function') {
    return detail();
  } else if (typeof detail === 'string') {
    return <Label style={[Predefine.MR10, detailStyle]}>{detail}</Label>;
  }
  return null;
}

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
  } else if (React.isValidElement(accessory)) {
    return accessory;
  } else if (typeof accessory === 'function') {
    return accessory();
  }
  return null;
}

function RenderBottomSeparator(props) {
  const { bottomSeparator, bottomSeparatorStyle } = props;
  if (React.isValidElement(bottomSeparator)) {
    return bottomSeparator;
  } else if (typeof bottomSeparator === 'function') {
    return bottomSeparator();
  } else if (typeof bottomSeparator === 'string') {
    if (bottomSeparator === 'none') {
      return null;
    } else if (bottomSeparator === 'full') {
      return <View style={[styles.sepFull, bottomSeparatorStyle]} />;
    } else if (bottomSeparator === 'indent') {
      return <View style={[styles.sepIndent, bottomSeparatorStyle]} />;
    }
  }
  return null;
}

const MemoRenderIcon = React.memo(RenderIcon);
const MemoRenderTitle = React.memo(RenderTitle);
const MemoRenderSubtitle = React.memo(RenderSubtitle);
const MemoRenderDetail = React.memo(RenderDetail);
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
    >
      <View style={[styles.contentContainer, contentStyle]}>
        <View style={[Predefine.RCA, { flex: 1 }]}>
          <MemoRenderIcon icon={icon} iconStyle={buildStyles.iconStyle} />
          <View style={buildStyles.titleSubtitleContainer}>
            <MemoRenderTitle
              title={title}
              titleStyle={buildStyles.titleStyle}
            />
            <MemoRenderSubtitle
              subtitle={subtitle}
              subtitleStyle={buildStyles.subtitleStyle}
            />
          </View>
        </View>
        <View style={[Predefine.RCC, styles.detailContainer]}>
          <MemoRenderDetail
            detail={detail}
            detailStyle={buildStyles.detailStyle}
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
    paddingHorizontal: 12,
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
};

ListRow.defaultProps = {
  spacingIconAndTitle: 10,
  bottomSeparator: 'full',
  accessory: 'indicator',
};

export default React.memo(ListRow);
