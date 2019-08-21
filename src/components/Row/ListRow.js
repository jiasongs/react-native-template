'use strict';
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import ImageView from '../Image/ImageView';
import Button from '../Touchable/Button';
import { Theme, ThemeContext } from '../../config/themes';

function RenderIcon(props) {
  const { icon, iconStyle } = props;
  if (React.isValidElement(icon)) {
    return icon;
  } else if (typeof icon === 'function') {
    return icon();
  } else if (typeof icon === 'number' || typeof icon === 'object') {
    return (
      <ImageView
        style={[styles.rowImage, iconStyle]}
        source={icon}
      />
    );
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
    return <Text style={[Theme.FC15333, titleStyle]}>{title}</Text>;
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
    return <Text style={[Theme.FC14666, Theme.MR10, detailStyle]}>{detail}</Text>;
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
const MemoRenderDetail = React.memo(RenderDetail);
const MemoRenderAccessory = React.memo(RenderAccessory);
const MemoRenderBottomSeparator = React.memo(RenderBottomSeparator);

function ListRow(props) {
  const {
    style,
    contentStyle,
    title,
    titleStyle,
    icon,
    iconStyle,
    detail,
    detailStyle,
    accessory,
    accessoryStyle,
    accessorySource,
    bottomSeparator,
    bottomSeparatorStyle,
    onPress
  } = props;

  const themeContext = useContext(ThemeContext);
  console.log('themeContext', themeContext)

  return (
    <Button style={[styles.container, style]} onPress={onPress}>
      <View style={[styles.contentContainer, contentStyle]}>
        <View style={Theme.RCA}>
          <MemoRenderIcon icon={icon} iconStyle={iconStyle} />
          <MemoRenderTitle title={title} titleStyle={titleStyle} />
        </View>
        <View style={[Theme.RCC, styles.detailContainer]}>
          <MemoRenderDetail detail={detail} detailStyle={detailStyle} />
          <MemoRenderAccessory
            accessoryStyle={accessoryStyle}
            accessory={accessory}
            accessorySource={accessorySource}
          />
        </View>
      </View>
      <MemoRenderBottomSeparator
        bottomSeparator={bottomSeparator}
        bottomSeparatorStyle={bottomSeparatorStyle}
      />
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
    alignSelf: 'stretch'
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingVertical: 15,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  detailContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
  },
  rowImage: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
  sepFull: {
    alignSelf: 'stretch',
    height: 1,
    backgroundColor: '#f3f3f3',
  },
  sepIndent: {
    alignSelf: 'stretch',
    marginLeft: 15,
    height: 1,
    backgroundColor: '#f3f3f3',
  },
  accessory: {
    width: 12,
    height: 12
  }
});

ListRow.propTypes = {
  style: ViewPropTypes.style,
  contentStyle: ViewPropTypes.style,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func]),
  titleStyle: Text.propTypes.style,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  iconStyle: Image.propTypes.style,
  detail: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func]),
  detailStyle: Text.propTypes.style,
  accessory: PropTypes.oneOfType([PropTypes.oneOf(['none', 'indicator']), PropTypes.element, PropTypes.func]),
  accessoryStyle: Image.propTypes.style,
  accessorySource: Image.propTypes.source,
  bottomSeparator: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.oneOf(['none', 'full', 'indent'])]),
  bottomSeparatorStyle: ViewPropTypes.style,
  onPress: PropTypes.func,
};

ListRow.defaultProps = {
  bottomSeparator: 'full',
  accessory: 'indicator'
};

export default React.memo(ListRow);