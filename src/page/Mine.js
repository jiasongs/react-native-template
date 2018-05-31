//import liraries
import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import NavigationBar from '../component/NavigationBar'
import FlatListView from '../component/FlatListView'
import SectionListView from '../component/SectionListView';
import Container from '../component/Container';
class Mine extends Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.page = 0;
    }

    componentDidMount() {
        Services.get('https://cnodejs.org/api/v1/topics', {}).then((data) => {
            let dataSource = data[0];
            // console.log(dataSource.data);
            this.setState({ data: dataSource.data })
        })
    }

    backOnPress = () => {
        RouteHelper.goBack()
    };
    rightOnPress = (info) => {
        ToastManager.showToast('qwe');
        MenuManager.showMenu(info.rightView)
    };
    onPress = () => {
        RouteHelper.navigate('LoginAndRegistered')
    };
    _captureRef = (v) => {
        this.flatList = v
    };
    _renderItem = (info) => {
        // console.log('z')
        return <Text style={{ height: 30 }}>{info.item.title}</Text>
    };
    _onEndReached = () => {
        // console.log('_onEndReached');
        setTimeout(() => {
            let dataTemp = this.state.data;
            let allLoad = false
            //模拟数据加载完毕,即page > 0,
            if (this.page < 3) {
                this.setState({ data: dataTemp.concat(this.state.data) });
            }
            // allLoad 当全部加载完毕后可以设置此属性，默认为false
            this.flatList.stopEndReached({ allLoad: this.page == 2 });
            this.page++;
            // console.log(this.page)
        }, 2000);
    };
    _onRefresh = () => {
        // console.log('_onRefresh');
        setTimeout(() => {
            // 调用停止刷新
            this.flatList.stopRefresh()
        }, 2000);
    };
    _keyExtractor = (item, index) => {
        return `z_${index}`
    };

    componentWillBlur() {
        // console.log('componentWillBlur')
    }

    componentWillFocus() {
        // console.log('componentWillFocus')
    }

    componentDidFocus() {
        // console.log('componentDidFocus')
    }

    componentDidBlur() {
        // console.log('componentDidBlur')
    }

    render() {
        let sections = [
            {
                key: '123',
                data: ['1', '2']
            },
            {
                key: '34',
                data: ['1', '2']
            },
        ]
        return (
            <Container>
                <NavigationBar
                    title={'我的'}
                    leftView={null}
                    rightViewOnPress={this.rightOnPress}
                    backOnPress={this.backOnPress}
                />
                <Text style={{ fontSize: FontSize(17) }} onPress={this.onPress}>跳转</Text>
                {/* {this.state.data.length > 0 ? (
                    <FlatListView // 自定义FlatList
                        ref={this._captureRef}
                        data={this.state.data}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                        onEndReached={this._onEndReached}
                        onRefresh={this._onRefresh}
                    />) : null} */}
                {/* {this.state.data.length > 0 ? (
                    <SectionListView // 自定义FlatList
                        ref={this._captureRef}
                        sections={sections}
                        redn
                        renderItem={this._renderItem}
                        renderSectionHeader={this._renderSectionHeader}
                        keyExtractor={this._keyExtractor}
                        onEndReached={this._onEndReached}
                        onRefresh={this._onRefresh}
                    />) : null} */}
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});

//make this component available to the app
export default Mine;
