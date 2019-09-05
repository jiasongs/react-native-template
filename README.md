# react-native-template

# 介绍

此库封装了常用 UI 组件和部分项目配置，可用于快速迭代开发基于 RN 的项目。

此库并不是一个UI组件库，是一个快速开发RN项目的框架，目前没有抽离框架中UI组件的计划，主要是因为此库的UI组件为了性能，采用React Hook的写法，如果单独开源UI组件需要改为Class的写法来兼容RN低版本，性能上不如Hook的写法，且本人精力有限，单独维护UI组件库需要消耗的精力太多，如果有志同道合者可以协作，会考虑单独抽离UI组件。

# 已完成

- Container
- Error
- Image
- Loading
- Navigation
- Touchable(Button)
- List
- Row
- Toast
- StorageManager
- Alert
- ActionSheet
- Form
- HighlightText
- Picker
- Overlay
- Badge
- Theme 支持切换主题

# 待完成
- WebBrowser
- Card
- PermissionsManager
- Popover
- Segmented
- Banner
- Stepper
- PayManager
- MediaPickerManager
- Services 结构

## Installation

```
$ npm install
$ cd ios && pod install
$ npm run ios // npm run android

```

## 更新

### 0.0.1

- 初始化工程，添加基础配置，增加常用 UI

## Contributing

如果觉得好用，请点一个 star，有 bug 的话请提 issue，我会尽快解决。

## License

MIT
