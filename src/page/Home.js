//import liraries
import React, { Component } from 'react'
import { Animated, ScrollView, StyleSheet, Text, View, Image, Alert, TextInput } from 'react-native'
import NavigationBar from '../component/NavigationBar'
import SegmentedView from '../component/SegmentedView/index'
import ImageView from '../component/ImageView'
import { inject, observer } from 'mobx-react'
import { Button } from 'teaset'
import FlatListView from '../component/FlatListView'
import AreaContent from '../component/AreaContent'
import Container from '../component/Container';
import Countdown from '../component/Countdown';
import { action } from 'mobx';
import SyanImagePicker from 'react-native-syan-image-picker';
import ImagePicker from 'react-native-image-picker';
import PayManager from '../config/PayManager'
import Stepper from '../component/Stepper'
import { QRscanner } from 'react-native-qr-scanner';


// create a component
@inject('ceshiStore111111')
@observer
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { scrollY: new Animated.Value(0), data: [], hidden: false };
        this.data = [];
        for (let index = 0; index < 30; index++) {
            this.data.push(index)

        }
        this.state = { value: 1 }
        this.page = 0
    }

    componentDidMount() {
        Services.get('https://cnodejs.org/api/v1/topics', { limit: 20 }).then((data) => {
            let dataSource = data[0];
            // console.log(dataSource.data);
            this.setState({ data: dataSource.data });
            // this.flatList.stopRefresh()
        })



    }
    rightOnPress = (info) => {
        // ToastManager.showToast('qwe')
        // MenuManager.showMenu(info.rightView)
        // alert('z')
    };
    onPress = () => {
        this.props.ceshiStore.addQury('已经跳转');
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
            //模拟数据加载完毕,即page > 0,
            this.setState({ data: dataTemp.concat(this.state.data) })
            this.flatList.stopEndReached({ allLoad: false });
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
    _onScroll = () => {
        // console.log('z')

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
    _onChange = (params) => {
        console.log(params)
        this.setState({ value: params })
        // console.log('_onChangezzzzzzzzzzz', params)
    }
    _onScroll = () => {

    }
    onPress = () => {

    }
    onRead = (info) => {
        alert(info)
    }
    render() {
        return (
            <Container fitIPhoneX={false} keyboardShouldPersistTaps={true}>
                <NavigationBar
                    title={'首页'}
                    hidden={this.state.hidden}
                    leftView={null}
                    rightViewOnPress={this.rightOnPress}
                />
                <Countdown />
                <TextInput style={{ height: 40, width: 100, backgroundColor: 'red' }} />
                <TextInput style={{ height: 40, width: 100, backgroundColor: 'blue' }} />
                <TextInput style={{ height: 40, width: 100, backgroundColor: 'green' }} />
                <ImageView style={{ width: 30, height: 30 }} source={Images.icon_bottom_pause} />
                {/* <Stepper
                    style={{ marginTop: 40, height: ScaleSize(50), width: 100, borderWidth: StyleSheet.hairlineWidth, }}
                    defaultValue={1}
                    value={this.state.value}
                    step={1}
                    min={1}
                    valueStyle={{ minWidth: 60 }}
                    onChange={this._onChange}
                /> */}
                {/* <Button ref={v => this.button = v} title={'测试'} onPress={this.onPress} />
                <SegmentedView
                    indicatorLineColor="red"
                    stickyHeaderY={80}
                    stickyScrollY={this.state.scrollY}
                    pageHeight={1200}
                    onChange={this._onChange}
                >
                    <View title='投道一ssss' style={{ flex: 1 }} activeTitleStyle={{ color: '#247E25', }}
                        titleStyle={{ color: '#333333' }}>
                        <FlatListView // 自定义FlatListb
                            ref={this._captureRef}
                            data={this.state.data}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                            onEndReached={this._onEndReached}
                            onRefresh={this._onRefresh}
                            initialRefresh={true}
                        />
                    </View>
                    <View title='投道二' style={{ flex: 1 }} activeTitleStyle={{ color: '#247E25' }}
                        titleStyle={{ color: '#333333' }}>
                    </View>
                    <View title='投道三sad' style={{ flex: 1 }} activeTitleStyle={{ color: '#247E25' }}
                        titleStyle={{ color: '#333333' }}>
                        <ScrollView>
                            {this.data.map((item, index) => {
                                return (<Text key={index} style={{ flex: 1 }}>123</Text>)
                            })}
                        </ScrollView>
                    </View>
                </SegmentedView> */}
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    sheetActiveTitle: {
        color: '#247E25',
        fontSize: FontSize(14),
    },
    sheetTitle: {
        color: '#333333',
        fontSize: FontSize(14),
    },
});

//make this component available to the app
export default Home;
