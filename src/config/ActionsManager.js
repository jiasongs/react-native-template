
import React from 'react';
import { View, Text } from 'react-native';
import { ActionSheet, Overlay, Label } from 'teaset';
import { fontSize, bouncer } from '../util/Tool';
import AreaContent from '../component/AreaContent';
import ShareContent from '../component/ShareContent';
import Theme from './Theme';

class ActionsManager {

    static pullViewRefs = []

    /** 参数
     * const params = {
        actions: [
            { title: 'Say hello', onPress: () => alert('Hello') },
            { title: 'Do nothing' },
            { title: 'Disabled', disabled: true },
        ],
        cancelAction:{
            title: 'Cancel'
        }
     }
     * 
     */
    // 先使用teaset自带的组件，后续自定义组件
    static show = (params) => {
        const actions = params.actions
        const cancelAction = params.cancelAction
        ActionSheet.show(actions, cancelAction)
    }

    static showShare(func) {
        this.showPullView(<ShareContent onPress={func} />, {})
    }

    static showArea(func) {
        this.showPullView(<AreaContent onPress={func} />, {})
    }

    static showPullView(component, option) {
        this.pullViewRefs = bouncer(this.pullViewRefs.slice()) // 过滤
        if (this.pullViewRefs.length === 0) {
            Overlay.show(
                <Overlay.PullView
                    ref={v => this.pullViewRefs.push(v)}
                    side={'bottom'}
                    modal={false}
                    rootTransform={'none'}
                    containerStyle={Theme.bgTransparentStyle}
                    onCloseRequest={() => this.hide()}
                    {...option}
                >
                    {component}
                </Overlay.PullView>
            )
        }
    }

    static hide() {
        this.pullViewRefs = bouncer(this.pullViewRefs.slice()) // 过滤
        if (this.pullViewRefs.length > 0) {
            const lastRef = this.pullViewRefs.pop()
            lastRef.close()
        }
    }
}


export default ActionsManager