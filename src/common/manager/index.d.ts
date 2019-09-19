import * as React from 'react';
import { Status } from 'react-native-permissions';

export type RationaleAndroid = {
  title: string;
  message: string;
  buttonPositive?: string;
  buttonNegative?: string;
  buttonNeutral?: string;
};

export type PermissionIOS =
  | 'backgroundRefresh'
  | 'bluetooth'
  | 'camera'
  | 'contacts'
  | 'event'
  | 'location'
  | 'mediaLibrary'
  | 'microphone'
  | 'motion'
  | 'notification'
  | 'photo'
  | 'reminder'
  | 'speechRecognition';

export type PermissionAndroid =
  | 'callPhone'
  | 'camera'
  | 'coarseLocation'
  | 'contacts'
  | 'event'
  | 'location'
  | 'microphone'
  | 'photo'
  | 'readSms'
  | 'receiveSms'
  | 'sendSms'
  | 'storage';

export type OptionTypeIOS = 'whenInUse' | 'alert' | 'badge' | 'sound';

export type CheckOptions = { type: OptionTypeIOS };

export type RequestOptions = {
  type: OptionTypeIOS;
  rationale?: RationaleAndroid;
};

export class PermissionsManager {
  static getTypes(): string[];

  static check(
    permission: PermissionIOS | PermissionAndroid,
    options?: CheckOptions,
  ): Promise<Status>;

  static request(
    permission: PermissionIOS | PermissionAndroid,
    options?: RequestOptions,
  ): Promise<Status>;

  static checkMultiple(
    permission: string,
    options?: CheckOptions,
  ): Promise<{ [key: string]: string }>;
}

export class StorageManager {
  static load(key: string): Promise<any>;

  static save(key: string, data: any): Promise<any>;

  static remove(key: number): Promise<any>;
}
