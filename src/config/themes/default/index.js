'use strict';
import { StyleSheet } from 'react-native';

export default {
  /**
   * @类型 [此属性为必须]
   */
  type: 1,
  /**
   * @Common
   */
  page: {
    style: {
      backgroundColor: '#f7f7f7',
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
      backgroundColor: '#fff',
    },
    titleStyle: {
      maxWidth: 200,
      fontSize: 16,
      color: '#000',
      fontWeight: 'bold',
    },
    detailStyle: {
      maxWidth: 230,
      fontSize: 16,
      color: '#000',
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
      backgroundColor: '#fff',
      paddingVertical: 17,
    },
    actionTitleStyle: {
      fontSize: 14,
      color: '#333'
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
      backgroundColor: '#fff',
      borderRadius: 6,
    },
    titleStyle: {
      fontSize: 12,
      color: '#999',
    },
    actionStyle: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: 'rgba(127, 127, 127, 0.3)',
      paddingVertical: 15,
    },
    actionTitleStyle: {
      fontSize: 14,
      color: '#000',
    },
    cancelActionStyle: {
      paddingVertical: 17,
      borderRadius: 6,
      backgroundColor: '#fff',
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
    statusBarStyle: 'dark-content',
    style: {
      paddingHorizontal: 0,
      backgroundColor: '#fff',
      borderBottomColor: '#dbdbdb',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    titleStyle: {
      color: '#333',
      fontSize: 17,
      fontWeight: 'bold',
    },
  },
  tabBar: {
    style: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: '#eee',
      backgroundColor: '#fff',
    },
  },
  /**
   * @ListRow 
   */
  listRow: {
    style: {
      backgroundColor: '#fff',
    },
    titleStyle: {
      color: '#333',
      fontSize: 15
    },
    detailStyle: {
      color: '#666',
      fontSize: 14
    },
    bottomSeparatorStyle: {
      backgroundColor: '#f3f3f3'
    },
  },
  /**
   * @Picker
   */
  picker: {
    titleStyle: {
      color: '#333',
      fontSize: 14
    }
  }
};