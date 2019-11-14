# react-native-template

# 介绍

此库封装了常用 UI 组件和部分项目配置，可用于快速迭代开发基于 RN 的项目。

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
- HighlightLabel
- Picker
- Badge
- Theme 支持切换主题
- Segmented
- 用 hook 重写 Overlay
- ImageView 失败的提示
- Popover
- PermissionsManager

# 待完成

- 适配设备旋转，优先级 1
- 网络请求类模板化，参考 swift 中的 moya 库，使用 hook 重写，优先级 2
- Stepper，优先级 3
- 查看大图，查看视频等，基于 Overlay，优先级 4
- PayManager，优先级 5
- MediaPickerManager，优先级 6

# 问题记录

- Card 的需求收集
- WebBrowser 的需求收集

## Installation

```
$ npm install
$ npm install react-navigation-stack@alpha --save
$ cd ios && pod install
$ cd .. && npm run postinstall
$ npm run ios // npm run android

```

## 更新

### 0.0.1

- 初始化工程，添加基础配置，增加常用 UI

## Contributing

如果觉得好用，请点一个 star，有 bug 的话请提 issue，我会尽快解决。

## License

MIT
