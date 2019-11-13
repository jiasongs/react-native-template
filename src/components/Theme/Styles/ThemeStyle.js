import { StyleSheet, Dimensions, Platform } from 'react-native';

export const Primary = {
  color: {
    main: '#333',
    second: '#999',
    reverse: '#fff',
    disabled: '#e5e6e8',
    separator: '#eee',
    badge: '#ff190c',
  },
  font: {
    multiple: 1,
  },
};

export default {
  /**
   * @Common
   */
  page: (primary) => ({
    style: {
      backgroundColor: primary.color.reverse,
    },
  }),
  /**
   * @Label
   */
  label: (primary) => ({
    style: {
      fontSize: 14,
      color: primary.color.main,
    },
  }),
  /**
   * @Input
   */
  input: (primary) => ({
    style: {
      fontSize: 14,
      color: primary.color.main,
    },
  }),
  /**
   * @Button
   */
  button: (primary) => ({
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
        backgroundColor: primary.color.main,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 3,
      },
      titleStyle: {
        color: primary.color.reverse,
        fontSize: 14,
      },
      iconStyle: {
        tintColor: primary.color.reverse,
      },
      disabledStyle: {
        opacity: 1,
        backgroundColor: primary.color.disabled,
      },
      disabledTitleStyle: {
        color: primary.color.second,
      },
      disabledIconStyle: {},
      loadingStyle: {
        ...StyleSheet.absoluteFillObject,
        color: primary.color.reverse,
        size: 'small',
      },
    },
    outline: {
      style: {
        backgroundColor: primary.color.reverse,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 3,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: primary.color.main,
      },
      titleStyle: {
        color: primary.color.main,
        fontSize: 14,
        shadowColor: 'rgba(0,0,0, 0)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
      },
      iconStyle: {
        tintColor: primary.color.main,
      },
      disabledStyle: {
        opacity: 1,
        borderColor: primary.color.second,
      },
      disabledTitleStyle: {
        color: primary.color.second,
      },
      disabledIconStyle: {},
      loadingStyle: {
        ...StyleSheet.absoluteFillObject,
        color: primary.color.main,
        size: 'small',
      },
    },
    clear: {
      style: {},
      titleStyle: {
        color: primary.color.main,
        fontSize: 14,
      },
      iconStyle: {
        tintColor: primary.color.main,
      },
      disabledStyle: {
        opacity: 1,
      },
      disabledTitleStyle: {
        color: primary.color.second,
      },
      disabledIconStyle: {},
      loadingStyle: {
        ...StyleSheet.absoluteFillObject,
        color: primary.color.main,
        size: 'small',
      },
    },
  }),
  /**
   * @Overlay
   */
  overlay: {
    maskOpacity: 0.3,
  },
  /**
   * @Alert
   */
  alert: (primary) => ({
    style: {
      width: Dimensions.get('screen').width * 0.7,
      minHeight: 52,
      backgroundColor: primary.color.reverse, // primary.color.reverse,
    },
    titleStyle: {
      fontSize: 16,
      color: primary.color.main,
      fontWeight: 'bold',
    },
    detailStyle: {
      fontSize: 16,
      color: primary.color.main,
      lineHeight: 22,
      textAlign: 'center',
    },
    actionContainerStyle: {
      width: '100%',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: primary.color.separator,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    actionStyle: {},
    actionTitleStyle: {
      fontSize: 16,
      color: primary.color.main,
    },
    separatorStyle: {
      marginRight: StyleSheet.hairlineWidth,
      borderRightWidth: StyleSheet.hairlineWidth,
      borderColor: primary.color.separator,
    },
  }),

  /**
   * @ActionSheet
   */
  sheet: (primary) => ({
    contentStyle: {
      maxHeight: 230,
      backgroundColor: primary.color.reverse,
      borderRadius: 6,
    },
    titleStyle: {
      fontSize: 12,
      color: primary.color.second,
    },
    actionStyle: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: 'rgba(127, 127, 127, 0.3)',
      paddingVertical: 15,
    },
    actionTitleStyle: {
      fontSize: 14,
      color: primary.color.main,
    },
    cancelActionStyle: {
      paddingVertical: 17,
      borderRadius: 6,
      backgroundColor: primary.color.reverse,
    },
    cancelTitleStyle: {
      fontSize: 14,
      color: 'red',
    },
  }),
  /**
   * @Toast
   */
  toast: (primary) => ({
    style: {
      maxWidth: '70%',
      backgroundColor: 'rgba(35,24,21,0.8)',
    },
    titleStyle: {
      color: primary.color.reverse,
      fontSize: 14,
      lineHeight: 20,
    },
  }),
  /**
   * @Navigation
   */
  navigationBar: (primary) => ({
    statusBarStyle: 'dark-content',
    style: {
      paddingHorizontal: 0,
      backgroundColor: primary.color.reverse,
      borderBottomColor: primary.color.separator,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    titleStyle: {
      color: primary.color.main,
      fontSize: 17,
      fontWeight: 'bold',
    },
    backTitleStyle: {
      color: primary.color.main,
    },
    backIconStyle: {
      tintColor: primary.color.main,
    },
  }),
  /**
   * @tabBar
   */
  tabBar: (primary) => ({
    style: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: primary.color.separator,
      backgroundColor: primary.color.reverse,
    },
  }),
  /**
   * @ListRow
   */
  listRow: (primary) => ({
    style: {
      backgroundColor: primary.color.reverse,
    },
    iconStyle: {
      width: 25,
      height: 25,
      tintColor: primary.color.main,
    },
    titleStyle: {
      color: primary.color.main,
      fontSize: 16,
      lineHeight: 18,
    },
    subtitleStyle: {
      color: primary.color.second,
      fontSize: 13,
      lineHeight: 16,
    },
    detailStyle: {
      color: primary.color.second,
      fontSize: 14,
    },
    bottomSeparatorStyle: {
      backgroundColor: primary.color.separator,
    },
  }),
  /**
   * @Picker
   */
  picker: (primary) => ({
    titleStyle: {
      color: primary.color.main,
      fontSize: 14,
    },
  }),
  /**
   * @Badge
   */
  badge: (primary) => ({
    capsule: {
      style: {
        backgroundColor: primary.color.badge,
        padding: 5,
        minWidth: 23,
        height: 23,
        borderRadius: 23 / 2,
      },
      countStyle: {
        color: '#fff',
        fontSize: 10,
      },
    },
    square: {
      style: {
        backgroundColor: primary.color.badge,
        padding: 5,
        minWidth: 23,
        height: 23,
        borderRadius: 3,
      },
      countStyle: {
        color: '#fff',
        fontSize: 10,
      },
    },
    dot: {
      style: {
        backgroundColor: primary.color.badge,
        width: 8,
        height: 8,
        borderRadius: 8 / 2,
      },
      countStyle: {},
    },
  }),
  /**
   * @Segmented
   */
  segmented: (primary) => ({
    style: {},
    segmentedBar: {
      style: {},
      indicatorStyle: {
        backgroundColor: primary.color.main,
      },
    },
    segmentedBarItem: {
      style: {},
      activeStyle: {},
      titleStyle: {
        color: primary.color.second,
        fontSize: 14,
      },
      activeTitleStyle: {
        color: primary.color.main,
      },
      iconStyle: {
        tintColor: primary.color.second,
      },
      activeIconStyle: {
        tintColor: primary.color.main,
      },
    },
  }),
  /**
   * @Popover
   */
  popover: (primary) => ({
    popoverArrow: {
      style: {},
      contentStyle: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        backgroundColor: primary.color.reverse,
        borderRadius: 6,
      },
    },
  }),
  /**
   * @Stepper
   */
  stepper: (primary) => ({
    style: {},
    valueStyle: {
      minWidth: 50,
      height: '100%',
      textAlign: 'center',
      paddingHorizontal: 10,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: primary.color.main,
    },
  }),
};
