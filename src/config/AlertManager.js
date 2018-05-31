//import liraries
import React from 'react';
import { View, Text } from 'react-native';
import AlertContent from '../component/AlertContent';
import { bouncer } from '../util/Tool';
import { Overlay } from 'teaset';
import Theme from './Theme'

class AlertManager {

    static popViewRefs = []

    // // params = {
    //     title: '温馨提示asdasd',
    //     titleStyle: {},
    //     detail: '详细描述',
    //     detailStyle: {},
    //     actions: [
    //         { title: '取消', titleStyle: {}, onPress: () => alert('取消') },
    //         { title: '确定', titleStyle: {}, onPress: () => alert('取消') },
    //     ]
    // }
    static show(params) {
        this.popViewRefs = bouncer(this.popViewRefs.slice()) // 过滤
        if (this.popViewRefs.length === 0) {
            Overlay.show(
                <Overlay.PopView
                    ref={v => this.popViewRefs.push(v)}
                    style={Theme.centerStyle}
                    type={'zoomOut'}
                    modal={false}
                    onCloseRequest={() => this.hide()}
                >
                    <AlertContent {...params} />
                </Overlay.PopView>
            )
        }
    }

    // component 为组件
    static showComponent(component) {
        this.popViewRefs = bouncer(this.popViewRefs.slice()) // 过滤
        if (this.popViewRefs.length === 0) {
            Overlay.show(
                <Overlay.PopView
                    ref={v => this.popViewRefs.push(v)}
                    style={Theme.centerStyle}
                    type={'zoomOut'}
                    modal={false}
                    onCloseRequest={() => this.hide()}
                >
                    {component}
                </Overlay.PopView>
            )
        }
    }

    static hide() {
        this.popViewRefs = bouncer(this.popViewRefs.slice()) // 过滤
        if (this.popViewRefs.length > 0) {
            const lastRef = this.popViewRefs.pop()
            lastRef.close()
        }
    }

}

//make this component available to the app
export default AlertManager;
