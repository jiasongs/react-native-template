'use strict'
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Wheel, Button } from 'teaset';
import { fontSize } from '../util/Tool'
import Theme from '../config/Theme'

// create a component
class AreaContent extends React.PureComponent {

    constructor(props) {
        super(props)
        this.data = []
        this.data = require('../asset/json/area.json')
        let len = this.data.length;
        let province = [], city = [], area = []
        this.data.map((item, index) => {
            province.push(item.name)
            if (index === 0) {
                item.city.map((item2, index2) => {
                    city.push(item2.name)
                    area = item2.area
                })
            }
        })
        this.state = { province, provinceIndex: 0, city: city, cityIndex: 0, area: area, areaIndex: 0 }
    }
    componentDidMount() {

    }

    _onProChange = (index) => {
        let city = this.data[index]
        let arr = []
        city.city.map((item, index) => {
            arr.push(item.name)
        })
        this.setState({
            city: arr,
            cityIndex: 0,
            provinceIndex: index,
            areaIndex: 0,
            area: city.city[0]['area']
        })
    }
    _onCityChange = (index) => {
        let city = this.data[this.state.provinceIndex]
        let arr = city.city
        let obj = arr[index]
        this.setState({
            area: obj.area,
            areaIndex: 0,
            cityIndex: index
        })
    }
    _onAreaChange = (index) => {
        this.setState({
            areaIndex: index,
        })
    }
    _onPressOK = () => {
        const { onPress } = this.props
        let one = this.data[this.state.provinceIndex]
        let two = one.city[this.state.cityIndex]
        let three = two.area[this.state.areaIndex]
        let province = one.name
        let city = two.name
        let area = three
        onPress && onPress([province, city, area])
        ActionsManager.hide()
    }
    _onPressCancel = () => {
        ActionsManager.hide()
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.actionContainer}>
                    <TouchableOpacity onPress={this._onPressCancel}>
                        <Text style={styles.actionText}>取消</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._onPressOK}>
                        <Text style={styles.actionText}>确定</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.wheelContainer}>
                    <Wheel
                        style={styles.wheelStyle}
                        itemStyle={styles.itemStyle}
                        index={this.state.provinceIndex}
                        items={this.state.province}
                        // defaultIndex={this.years.findIndex((item) => item == currentYear)}
                        onChange={this._onProChange}
                    />
                    <Wheel
                        style={styles.wheelStyle}
                        itemStyle={styles.itemStyle}
                        index={this.state.cityIndex}
                        items={this.state.city}
                        // defaultIndex={this.months.findIndex((item) => item == currentMounth)}
                        onChange={this._onCityChange}
                    />
                    <Wheel
                        style={styles.wheelStyle}
                        itemStyle={styles.itemStyle}
                        index={this.state.areaIndex}
                        items={this.state.area}
                        // defaultIndex={days.findIndex((item) => item == currentDay)}
                        onChange={this._onAreaChange}
                    />
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingBottom: Theme.isIPhoneX ? Theme.fitIPhoneXBottom : 0,
    },
    wheelContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    wheelStyle: {
        height: 180,
        width: Theme.screen_width / 3,
    },
    itemStyle: {
        textAlign: "center",
        fontSize: fontSize(14),
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    actionText: {
        color: Theme.areaActionTitleColor,
        fontSize: fontSize(14),
    }
});

//make this component available to the app
export default AreaContent;
