//import liraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'
import BackgroundTimer from 'react-native-background-timer';
import { sec_to_time_day } from '../util/Tool';

// 倒计时组件
class Countdown extends React.PureComponent {

    static propTypes = {
        deadline: PropTypes.number, // 截止时间,秒
        millisec: PropTypes.number, // 间隔
        backgroundTime: PropTypes.bool,// 应用切换到后台也会执行倒计时
        onIntervalChange: PropTypes.func,
        onIntervalStart: PropTypes.func,
        onIntervalStop: PropTypes.func,
    };

    static defaultProps = {
        deadline: 1530233496,
        millisec: 1000,
        backgroundTime: false
    };

    constructor(props) {
        super(props);
        this.intervalId = null
        this.currentTime = Moment().format('X')
        this.difference = props.deadline - this.currentTime
        let timeArr = [0, 0, 0, 0]
        console.log('this.difference', this.difference)
        if (this.difference >= 0) {
            timeArr = sec_to_time_day(this.difference)
        }
        this.state = { timeArr }
    };

    componentDidMount() {
        this.startInterval()
    };

    componentWillUnmount() {
        this.stopInterval()
    };

    startInterval = () => {
        const { millisec, backgroundTime, onIntervalStart } = this.props
        if (backgroundTime) {
            BackgroundTimer.start();
        }
        this.intervalId = BackgroundTimer.setInterval(this.intervalCallBack, millisec);
        onIntervalStart && onIntervalStart()
    };

    stopInterval = () => {
        const { backgroundTime, onIntervalStop } = this.props
        if (backgroundTime) {
            BackgroundTimer.stop()
        }
        BackgroundTimer.clearInterval(this.intervalId)
        onIntervalStop && onIntervalStop(this.difference)
        this.intervalId = null
    };

    intervalCallBack = () => {
        const { deadline, onIntervalChange } = this.props
        this.currentTime = Moment().format('X')
        this.difference = deadline - this.currentTime
        if (this.difference >= 0) {
            let timeArr = sec_to_time_day(this.difference)
            this.setState({ timeArr })
        }
        if (this.difference === 0) {
            this.stopInterval()
            return;
        }
        onIntervalChange && onIntervalChange(this.difference)
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.timeArr}</Text>
            </View>
        );
    };
}

// define your styles
const styles = StyleSheet.create({
    container: {

    },
});

//make this component available to the app
export default Countdown;
