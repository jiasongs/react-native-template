'use strict';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storageInstance = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
});

export default class StorageManager {
  static load(key) {
    return new Promise((resolve) => {
      storageInstance
        .load({ key })
        .then((data) => {
          resolve(data);
        })
        .catch(() => {
          resolve(null);
        });
    });
  }

  static save = async (key, data) => {
    return new Promise((resolve) => {
      storageInstance
        .save({ key, data })
        .then(() => {
          resolve(data);
        })
        .catch(() => {
          resolve(null);
        });
    });
  };

  static remove = async (key) => {
    return new Promise((resolve) => {
      storageInstance
        .remove({ key })
        .then((data) => {
          resolve(data);
        })
        .catch(() => {
          resolve(null);
        });
    });
  };
}
