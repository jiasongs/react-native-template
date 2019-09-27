# react-native-template

# 介绍

此库封装了常用 UI 组件和部分项目配置，可用于快速迭代开发基于 RN 的项目。

此库并不是一个 UI 组件库，是一个快速开发 RN 项目的框架，目前没有抽离框架中 UI 组件的计划，主要是因为此库的 UI 组件为了性能，采用 React Hook 的写法，如果单独开源 UI 组件需要改为 Class 的写法来兼容 RN 低版本，性能上不如 Hook 的写法，且本人精力有限，单独维护 UI 组件库需要消耗的精力太多，如果有志同道合者可以协作，会考虑单独抽离 UI 组件。

# 已完成

- Container
- Error
- ImageView
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
- Badge
- Theme 支持切换主题
- Segmented
- 用 hook 重写 Overlay
- ImageView 失败的提示
- Popover
- PermissionsManager

# 待完成
- Stepper
- 查看大图，查看视频等，基于 Overlay
- Services 结构
- PayManager
- MediaPickerManager

# 问题记录
- Card 的需求收集
- WebBrowser 的需求收集
- ~~Segmented 安卓需要处理下更新 contentSize 后，bar 的偏移问题，懒加载的问题!!!~~
- ~~用 hook 重写 ListView -- FlatList 不太适合用 Hook 写法包装，具体参见源码~~

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
