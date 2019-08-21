module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "legacyDecorators": true,
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "react-hooks"
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-unused-vars": ["error", { "vars": "all", "ignoreRestSiblings": true }],
    "react/jsx-uses-vars": 2,
    "react/jsx-uses-react": 2,
    "indent": [
      "error",
      2,
      { "SwitchCase": 1 }
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ]
  },
  "globals": {
    "expect": true,
    "it": true,
    "describe": true,
    "__DEV__": true,
    "__IOS__": true,
    "__ANDROID__": true,
    "SCREEN_WIDTH": true,
    "SCREEN_HEIGHT": true,
    "Images": true,
    "StorageManager": true,
    "LayoutAnimationManager": true,
    "InteractionManager": true,
    "requestAnimationFrame": true,
    "FormData": true,
    "fetch": true,
    "Log": true,
    "Alert": true,
  }
};
