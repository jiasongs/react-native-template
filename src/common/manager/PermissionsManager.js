import Permissions from 'react-native-permissions';

class PermissionsManager {
  static getTypes() {
    return Permissions.getTypes();
  }
  static check(permission, options) {
    return Permissions.check(permission, options);
  }
  static request(permission, options) {
    return Permissions.request(permission, options);
  }
  static checkMultiple(permissions, options) {
    return Permissions.checkMultiple(permissions, options);
  }
}

export default PermissionsManager;
