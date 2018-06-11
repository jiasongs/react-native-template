# react-native-template

react-native-template（TODO-Template）是一个致力于快速开发的App模板，其中包含了许多常用功能，极大的提高了RN开发者的效率


# 项目目录

        ├── index.js  
        ├── App.js
        └── src
            ├── component  			可复用的组件
            ├── page       			完整页面
            ├── config 			    配置项（常量、Global、Tool、管理类）
            ├── util				工具类（Services封装等)
            ├── router				路由（路由管理，路由封装）
            └── asset	
                ├──images       静态图片
                ├──index.js		导出静态图片

        在component和page目录中，可能还有一些内聚度较高的模块再建目录    


# 项目简介

## 状态管理

>使用`Mobx`来作为本模板App的状态管理组件，已经配置好了Mobx环境，把.babelrc复制进项目即可，当使用`mobx-react`时，将Store引入组件中，即使用`@observer`，会重写组件的`shouldcomponentupdate`函数，极大的优化了性能，需要注意的是组件要继承`Component`，因为`PureComponent`也重写了`shouldcomponentupdate`函数。对于@observable一个数组时（@observable todoArray），在使用FlatList组件时，注意`data={todoArray.slice()}`，FlatList只支持普通的数组。

note:如果想使用`Redux`，请自行引入。

## 模板App使用的库 （待整理）

        "jcore-react-native": "^1.2.5",
        "jpush-react-native": "^2.1.13",
        "jshare-react-native": "^1.3.1",
        "mobx": "^3.6.1",
        "mobx-react": "^4.4.3",
        "moment": "^2.21.0",
        "query-string": "^5.1.0",
        "react": "^16.2.0",
        "react-native": "0.53.3",
        "react-native-spinkit": "^1.1.1",
        "react-native-splash-screen": "^3.0.6",
        "react-native-storage": "^0.2.2",
        "react-navigation": "^1.5.11",
        "teaset": "^0.5.6"
     

# 组件 （待补充）

- react-navigation （导航库）

>目前主流的导航库

- teaset (UI库)

>一个轻量级纯js的UI库，里面包含20多常用组件，个人感觉还是很好用的。

- NavigationBar （导航栏组件）

>基于teaset的NavigationBar封装，可自行定制。适配iPhoneX，安卓6.0以上状态栏沉浸式。注意：使用时请不要用SafeAreaView包裹。可以用SafeAreaView包裹其他的组件。

- SegmentedView（分页组件，类似react-native-scrollable-tab-view，已加入懒加载，可悬浮的bar）

>基于teaset的SegmentedBar封装，可自行定制。重新使用SegmentedBar封装SegmentedView，iOS上使用ScrollView,安卓上使用ViewPagerAndroid。
注意：teaset的SegmentedView在某些需求上有些问题，目前已知的的问题：
1.如果SegmentedView占了除了导航栏之外的整个屏幕（不包括导航栏），并且`type={'carousel'}`时，在iOS上是没有问题，在安卓上使用列表下拉刷新或者上拉加载时会有很大的问题，基本是不能使用。
2.如果SegmentedView之外下面还有其他组件渲染，就会出现样式问题，必须设置固定高度才能解决。
以上问题已经通过封装SegmentedBar解决。

- RouteHelper（路由管理类，在router文件夹下）

>路由管理类，封装高级组件实现的react-navigation管理。简化操作，并且不用集成redux就可以获取整个路由栈的状态和信息。RouteHelper使用的是1.5.11版本，`willBlur`，`willFocus`，`didFocus`，`didBlur`路由的生命周期在各个界面中可以实现componentWillBlur，componentWillFocus，componentDidFocus，componentDidBlur来获得回调

- StickyHeader （悬浮的header）

>实现的一个悬浮的header，具体用法可以参考SegmentedView

- 登陆注册页面 （pages/login/LoginAndRegistered.js）

>登陆注册页面，项目尽量保证登陆注册UI一致

- react-native-storage （本地存储）

>使用RN中文网的react-native-storage

- Services

>封装的fetch

- jshare-react-native (第三方登陆、分享)

>暂时选定极光的组件。（https://github.com/jpush/jshare-react-native）里面包含了分享和登陆，利于维护和管理。

- jpush-react-native (推送)

>暂时选定极光推送。（https://github.com/jpush/jpush-react-native）

- react-native-splash-screen (启动页)

>使用 https://github.com/crazycodeboy/react-native-splash-screen

- react-native-rename （给模板项目自定义名字）

>使用 https://github.com/junedomingo/react-native-rename

- SpinnerLoading （加载的Loading）

>基于react-native-spinkit封装的加载组件，使其显示在中间位置。直接用的话iOS是显示不了中间位置的。

- TabBarBottom (自定义TabBar)
>react-navigation的Tabbar，自定义。

- Tool (工具类)

>一些常用的工具类函数

- addCustomProps (自定义组件的Props)

>使用原型链更改组件原有的props，RN组件和第三方组件都可以更改，但是不要过度使用和依赖此函数。可以在入口处或者配置处全局设置一些组件的props

- DropdownMenu (类似美团下拉的三角按钮)

>参考Setting页面

- FlatListView （封装FlatList）

>增加了上拉刷新，下拉刷新等功能，可以利用props开启或者关闭

- 视频组件

>播放视频，暂停视频，拖动播放，放大缩小视频等等

- SectionListView （封装sectionList）

>增加了上拉刷新，下拉刷新等功能，可以利用props开启或者关闭

- 支付宝、微信支付 （可选）

>目前用的是  https://github.com/puti94/react-native-puti-pay

- HTMLView显示富文本

>基于react-native-render-html封装

- 图片多选 (可选)

>使用 https://github.com/syanbo/react-native-syan-image-picker

- 图片，视频单选

>使用 https://github.com/syanbo/react-native-image-picker

# 后续添加计划 （待整理）


- 封装聊天组件

>

- nativebase (可选，UI库，暂时不集成)

>目前项目中用的UI库是teaset，nativebase组件很多，基本app开发的UI组件都有，但文档不足，且非常“重”。如果要集成需要多方面考虑。



- 图片查看

>类似微信查看大图的功能，目前还没有想好实现方案。可以基于react-native-lightbox封装一个



# 协议

No license




