/*
 * @author: jiasong 
 * @creation time: 2018-06-12 10:00:24
 */

'use strict';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import NavigationBar from '../component/NavigationBar';
import Container from '../component/Container';
import SpinnerLoading from '../component/SpinnerLoading';
import ChatPage from '../component/Chat1/ChatPage'



class Chat extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            messages: [
                {
                    type: 1,// 消息类型 1 2 3 4 5 6 ...
                    message_id: Math.random(),
                    from_user: {
                        id: 1000,
                        nick_name: '',
                        avatar: 'https://img4.duitang.com/uploads/item/201607/23/20160723225638_WcYXr.jpeg',
                    },
                    to_user: {
                        id: 3
                    },
                    content: '123',
                    img_width: 200,
                    img_height: 200,
                    img_size: 1431231,
                    voice_duration: 12, // 语音时间,s
                    voice_ext: 'wav',// 语音后缀
                    voice_size: 1312313,
                    created_at: 12345456,// 
                }, {
                    type: 1,// 消息类型 1 2 3 4 5 6 ...
                    message_id: Math.random(),
                    from_user: {
                        id: 2,
                        nick_name: '',
                        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528793132482&di=fc622f2c78594ec077a4fcfc023cb542&imgtype=0&src=http%3A%2F%2Fimg1.touxiang.cn%2Fuploads%2F20130330%2F30-074643_295.jpg',
                    },
                    to_user: {
                        id: 4
                    },
                    content: '你好妈的还是得就暗示的一后我去ID你就暗示可能不带下水很大 加深对我回去一大青蛙一会撒谎丢挥洒UI会丢哈斯半年后就不大好随后完全',
                    img_width: 200,
                    img_height: 200,
                    img_size: 1431231,
                    voice_duration: 12, // 语音时间,s
                    voice_ext: 'wav',// 语音后缀
                    voice_size: 1312313,
                    created_at: 12345456,// 
                }, {
                    type: 1,// 消息类型 1 2 3 4 5 6 ...
                    message_id: 12,
                    from_user: {
                        id: 2,
                        nick_name: '',
                        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528793132482&di=fc622f2c78594ec077a4fcfc023cb542&imgtype=0&src=http%3A%2F%2Fimg1.touxiang.cn%2Fuploads%2F20130330%2F30-074643_295.jpg',
                    },
                    to_user: {
                        id: 5
                    },
                    content: 'fdfg',
                    img_width: 200,
                    img_height: 200,
                    img_size: 1431231,
                    voice_duration: 12, // 语音时间,s
                    voice_ext: 'wav',// 语音后缀
                    voice_size: 1312313,
                    created_at: 12345456,// 
                }
            ]
        }
        this.user = {
            id: 1000,
            nick_name: '',
            avatar: 'https://img4.duitang.com/uploads/item/201607/23/20160723225638_WcYXr.jpeg',
        }
    }

    _onPressSend = (text) => {
        const messages = ChatPage.appendMessages(this.state.messages, [{
            type: 1,// 消息类型 1 2 3 4 5 6 ...
            message_id: Math.random(),
            from_user: {
                id: 1000,
                nick_name: '',
                avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528793132482&di=fc622f2c78594ec077a4fcfc023cb542&imgtype=0&src=http%3A%2F%2Fimg1.touxiang.cn%2Fuploads%2F20130330%2F30-074643_295.jpg',
            },
            to_user: {
                id: 5
            },
            content: `${text}`,
            img_width: 200,
            img_height: 200,
            img_size: 1431231,
            voice_duration: 12, // 语音时间,s
            voice_ext: 'wav',// 语音后缀
            voice_size: 1312313,
            created_at: 12345456,// 
        }])
        this.setState({ messages })
        // console.log('messages', messages)
    }

    render() {
        return (
            <Container keyboardShouldPersistTaps={false}>
                <NavigationBar title={'聊天'} rightView={<TouchableOpacity onPress={this._onPress}><Text>测试发送</Text></TouchableOpacity>} />
                <ChatPage
                    user={this.user}
                    messages={this.state.messages}
                    onPressSend={this._onPressSend}
                />
            </Container>
        );
    }
}

const styles = StyleSheet.create({

});

export default Chat