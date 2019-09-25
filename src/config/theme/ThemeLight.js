'use strict';
import { StyleSheet, Platform, Dimensions } from 'react-native';
import ThemePrimary from './ThemePrimary';

const primary = {
  color: {
    main: '#333',
    second: '#999',
    reverse: '#fff',
    disabled: '#e5e6e8',
    separator: '#eee',
    badge: '#ff190c',
  },
};

export default {
  /**
   * @类型 [此属性为必须]
   */
  type: 1,
  primary: primary,
  /**
   * @Common
   */
  page: {
    style: {
      backgroundColor: ThemePrimary.color.reverse,
    },
  },
  /**
   * @Button
   */
  button: {
    iconVerticalStyle: {
      // 垂直
      width: 40,
      height: 40,
    },
    iconHorizontalStyle: {
      // 水平
      width: 20,
      height: 20,
    },
    raisedStyle: {
      ...Platform.select({
        android: {
          elevation: 4,
        },
        ios: {
          shadowColor: 'rgba(0,0,0, .4)',
          shadowOffset: { height: 1, width: 1 },
          shadowOpacity: 1,
          shadowRadius: 1,
        },
      }),
    },
    solid: {
      style: {
        backgroundColor: ThemePrimary.color.main,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 3,
      },
      titleStyle: {
        color: ThemePrimary.color.reverse,
        fontSize: 14,
      },
      iconStyle: {
        tintColor: ThemePrimary.color.reverse,
      },
      disabledStyle: {
        opacity: 1,
        backgroundColor: ThemePrimary.color.disabled,
      },
      disabledTitleStyle: {
        color: ThemePrimary.color.second,
      },
      loadingStyle: {
        ...StyleSheet.absoluteFillObject,
        color: ThemePrimary.color.reverse,
        size: 'small',
      },
    },
    outline: {
      style: {
        backgroundColor: ThemePrimary.color.reverse,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 3,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: ThemePrimary.color.main,
      },
      titleStyle: {
        color: ThemePrimary.color.main,
        fontSize: 14,
        shadowColor: 'rgba(0,0,0, 0)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
      },
      iconStyle: {
        tintColor: ThemePrimary.color.main,
      },
      disabledStyle: {
        opacity: 1,
        borderColor: ThemePrimary.color.second,
      },
      disabledTitleStyle: {
        color: ThemePrimary.color.second,
      },
      loadingStyle: {
        ...StyleSheet.absoluteFillObject,
        color: ThemePrimary.color.main,
        size: 'small',
      },
    },
    clear: {
      style: {},
      titleStyle: {
        color: ThemePrimary.color.main,
        fontSize: 14,
      },
      iconStyle: {
        tintColor: ThemePrimary.color.main,
      },
      disabledStyle: {
        opacity: 1,
      },
      disabledTitleStyle: {
        color: ThemePrimary.color.second,
      },
      loadingStyle: {
        ...StyleSheet.absoluteFillObject,
        color: ThemePrimary.color.main,
        size: 'small',
      },
    },
  },
  /**
   * @Overlay
   */
  overlay: {
    maskOpacity: 0.3,
  },
  /**
   * @Alert
   */
  alert: {
    style: {
      width: Dimensions.get('screen').width * 0.7,
      minHeight: 52,
      backgroundColor: ThemePrimary.color.reverse,
    },
    titleStyle: {
      fontSize: 16,
      color: ThemePrimary.color.main,
      fontWeight: 'bold',
    },
    detailStyle: {
      fontSize: 16,
      color: ThemePrimary.color.main,
      lineHeight: 22,
      textAlign: 'center',
    },
    actionContainerStyle: {
      width: '100%',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: ThemePrimary.color.separator,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    actionStyle: {},
    actionTitleStyle: {
      fontSize: 16,
      color: ThemePrimary.color.main,
    },
    separatorStyle: {
      marginRight: StyleSheet.hairlineWidth,
      borderRightWidth: StyleSheet.hairlineWidth,
      borderColor: ThemePrimary.color.separator,
    },
  },

  /**
   * @ActionSheet
   */
  sheet: {
    contentStyle: {
      maxHeight: 230,
      backgroundColor: ThemePrimary.color.reverse,
      borderRadius: 6,
    },
    titleStyle: {
      fontSize: 12,
      color: ThemePrimary.color.second,
    },
    actionStyle: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: 'rgba(127, 127, 127, 0.3)',
      paddingVertical: 15,
    },
    actionTitleStyle: {
      fontSize: 14,
      color: ThemePrimary.color.main,
    },
    cancelActionStyle: {
      paddingVertical: 17,
      borderRadius: 6,
      backgroundColor: ThemePrimary.color.reverse,
    },
    cancelTitleStyle: {
      fontSize: 14,
      color: 'red',
    },
  },
  /**
   * @Toast
   */
  toast: {
    style: {
      maxWidth: '70%',
      backgroundColor: 'rgba(35,24,21,0.8)',
    },
    titleStyle: {
      color: ThemePrimary.color.reverse,
      fontSize: 14,
      lineHeight: 20,
    },
  },

  /**
   * @Navigation
   */
  get navigationBar() {
    console.log('navigationBar');
    console.log(ThemePrimary.color.main);
    return {
      statusBarStyle: 'dark-content',
      style: {
        paddingHorizontal: 0,
        backgroundColor: ThemePrimary.color.reverse,
        borderBottomColor: ThemePrimary.color.separator,
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      titleStyle: {
        color: ThemePrimary.color.main,
        fontSize: 17,
        fontWeight: 'bold',
      },
      defaultLeftAction: {
        iconStyle: {
          tintColor: 'black',
        },
      },
    };
  },
  // navigationBar: {

  // },
  tabBar: {
    style: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: ThemePrimary.color.separator,
      backgroundColor: ThemePrimary.color.reverse,
    },
  },
  /**
   * @ListRow
   */
  listRow: {
    style: {
      backgroundColor: ThemePrimary.color.reverse,
    },
    iconStyle: {
      width: 25,
      height: 25,
      tintColor: ThemePrimary.color.main,
    },
    titleStyle: {
      color: ThemePrimary.color.main,
      fontSize: 16,
      lineHeight: 18,
    },
    subtitleStyle: {
      color: ThemePrimary.color.second,
      fontSize: 13,
      lineHeight: 16,
    },
    detailStyle: {
      color: ThemePrimary.color.second,
      fontSize: 14,
    },
    bottomSeparatorStyle: {
      backgroundColor: ThemePrimary.color.separator,
    },
  },
  /**
   * @Picker
   */
  picker: {
    titleStyle: {
      color: ThemePrimary.color.main,
      fontSize: 14,
    },
  },
  /**
   * @Badge
   */
  badge: {
    capsule: {
      style: {
        backgroundColor: ThemePrimary.color.badge,
        padding: 5,
        minWidth: 23,
        height: 23,
        borderRadius: 23 / 2,
      },
      countStyle: {
        color: ThemePrimary.color.reverse,
        fontSize: 10,
      },
    },
    square: {
      style: {
        backgroundColor: ThemePrimary.color.badge,
        padding: 5,
        minWidth: 23,
        height: 23,
        borderRadius: 3,
      },
      countStyle: {
        color: ThemePrimary.color.reverse,
        fontSize: 10,
      },
    },
    dot: {
      style: {
        backgroundColor: ThemePrimary.color.badge,
        width: 8,
        height: 8,
        borderRadius: 8 / 2,
      },
      countStyle: {},
    },
  },
  /**
   * @Segmented
   */
  segmented: {
    style: {},
    segmentedBar: {
      style: {},
      indicatorStyle: {
        backgroundColor: ThemePrimary.color.main,
      },
    },
    segmentedBarItem: {
      style: {},
      activeStyle: {},
      titleStyle: {
        color: ThemePrimary.color.second,
        fontSize: 14,
      },
      activeTitleStyle: {
        color: ThemePrimary.color.main,
      },
      iconStyle: {
        tintColor: ThemePrimary.color.second,
      },
      activeIconStyle: {
        tintColor: ThemePrimary.color.main,
      },
    },
  },
  /**
   * @Popover
   */
  popover: {
    popoverArrow: {
      style: {},
      contentStyle: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        backgroundColor: ThemePrimary.color.reverse,
        borderRadius: 6,
      },
    },
  },
};
