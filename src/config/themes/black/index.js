'use strict';
import { StyleSheet } from 'react-native';

export default {
  /**
   * @类型 [此属性为必须]
   */
  type: 2,
  /**
   * @Common
   */
  page: {
    style: {
      backgroundColor: '#333',
    }
  },
  /**
   * @Button
   */
  button: {
    solid: {
      style: {

      }
    },
    clear: {
      style: {

      }
    },
    outline: {
      style: {

      }
    },
  },
  /**
   * @Alert
   */
  alert: {
    style: {
      width: 260,
      minHeight: 52,
      backgroundColor: '#333',
    },
    titleStyle: {
      maxWidth: 200,
      fontSize: 16,
      color: '#fff',
      fontWeight: 'bold',
    },
    detailStyle: {
      maxWidth: 230,
      fontSize: 16,
      color: '#fff',
      lineHeight: 20,
    },
    actionContainerStyle: {
      width: '100%',
      backgroundColor: '#dbdbdb',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    actionStyle: {
      backgroundColor: '#333',
      paddingVertical: 17,
    },
    actionTitleStyle: {
      fontSize: 14,
      color: '#fff'
    },
    separatorStyle: {
      borderRightWidth: StyleSheet.hairlineWidth,
      borderColor: '#eee',
    },
  },
  /**
   * @ActionSheet
   */
  sheet: {
    contentStyle: {
      maxHeight: 230,
      backgroundColor: '#333',
      borderRadius: 6,
    },
    titleStyle: {
      fontSize: 12,
      color: '#fff',
    },
    actionStyle: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: 'rgba(127, 127, 127, 0.3)',
      paddingVertical: 15,
    },
    actionTitleStyle: {
      fontSize: 14,
      color: '#fff',
    },
    cancelActionStyle: {
      paddingVertical: 17,
      borderRadius: 6,
      backgroundColor: '#333',
    },
    cancelTitleStyle: {
      fontSize: 14,
      color: 'fff',
    },
  },
  /**
   * @Toast 
   */
  toast: {
    style: {
      backgroundColor: 'rgba(35,24,21,0.8)',
    },
    textStyle: {
      color: '#fff',
      fontSize: 14,
      lineHeight: 20
    },
  },

  /**
   * @Navigation
   */
  navigationBar: {
    statusBarStyle: 'light-content',
    style: {
      paddingHorizontal: 0,
      backgroundColor: '#333',
      borderBottomColor: '#666',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    titleStyle: {
      color: '#fff',
      fontSize: 17,
      fontWeight: 'bold',
    },
  },
  tabBar: {
    style: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: '#666',
      backgroundColor: '#333',
    },
  },
  /**
   * @ListRow 
   */
  listRow: {
    style: {
      backgroundColor: '#333',
    },
    titleStyle: {
      color: '#fff',
      fontSize: 15
    },
    detailStyle: {
      color: '#999',
      fontSize: 14
    },
    bottomSeparatorStyle: {
      backgroundColor: '#666'
    },
  },
  /**
   * @Picker
   */
  picker: {
    titleStyle: {
      color: '#fff',
      fontSize: 14
    }
  }
};