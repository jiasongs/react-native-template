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
import ChatManager from '../component/Chat1/ChatManager'
import MessagesManager from '../component/Chat1/MessagesManager';

class Chat extends React.PureComponent {

    constructor(props) {
        super(props);
        this.defaultMessages = [
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
                content: '[发呆]asdsd[色]你好吗[流泪]',
                img_width: 200,
                img_height: 200,
                img_size: 1431231,
                voice_duration: 12, // 语音时间,s
                voice_ext: 'wav',// 语音后缀
                voice_size: 1312313,
                create_at: 1529933134,// 
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
                create_at: 1529933120,// 
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
                create_at: 1529933100,// 
            }
        ]

        this.user = {
            id: 21,
            nick_name: '',
            avatar: 'https://img4.duitang.com/uploads/item/201607/23/20160723225638_WcYXr.jpeg',
        }
        // 最好结合Mobx
        this.state = { messages: this.defaultMessages }

        // 大部分情况下这三行代码应该写在登陆处，保持全局只有一个ChatManager，目前测试的话可以在这里写
        // 最好结合Mobx
        const url = 'ws://wmbchat.nididake.com:9502'
        this._chatManager = new ChatManager({ webSocketUrl: url, token: 'gejqgqoo42342' })
        this._chatManager.onChatMessage = this._onChatMessage
    }

    _onChatMessage = (data) => {
        // 接收到消息
        console.log('_onChatMessage', data)
        const { type } = data
        if (type === 1) { // 
            this.setState({ messages: MessagesManager.appendMessages(this.state.messages, data) })
            // this.chatPageRef.sendTextMessage(data) // 另一种方式
        }
    }

    _onPressSend = (text) => {
        if (text.length > 0) {
            const message = {
                type: 1,
                content: text,
                from_user: this.user,
                to_user: {
                    id: 23
                }
            }
            this._chatManager.sendMessage(message)
        } else {
            ToastManager.show('请输入信息！')
        }
        // const messages = ChatPage.appendMessages(this.state.messages, [{
        //     type: 1,// 消息类型 1 2 3 4 5 6 ...
        //     message_id: Math.random(),
        //     from_user: {
        //         id: 1000,
        //         nick_name: '',
        //         avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528793132482&di=fc622f2c78594ec077a4fcfc023cb542&imgtype=0&src=http%3A%2F%2Fimg1.touxiang.cn%2Fuploads%2F20130330%2F30-074643_295.jpg',
        //     },
        //     to_user: {
        //         id: 5
        //     },
        //     content: `${text}`,
        //     img_width: 200,
        //     img_height: 200,
        //     img_size: 1431231,
        //     voice_duration: 12, // 语音时间,s
        //     voice_ext: 'wav',// 语音后缀
        //     voice_size: 1312313,
        //     created_at: 12345456,// 
        // }])
        // this.setState({ messages })
        // console.log('messages', messages)
    }

    _onRecording = (params) => {
        if (params.duration < 1) {
            ToastManager.show('录音时间过短！')
            return
        }
        const message = {
            voice_duration: params.duration, // 语音时间,s
            voice_ext: 'aar',// 语音后缀
            voice_size: 1312313,
            created_at: 12345456,// 
            content: params.uri
        }
        // this.setState({ messages: MessagesManager.appendMessages(this.state.messages, newData) })
        // this.chatPageRef.sendVoiceMessage(message)
    }

    _onPressAlbum = (albums) => {
        // this.setState({ messages: MessagesManager.appendMessages(this.state.messages, newData) })
        // albums.forEach(item => {
        //     this.chatPageRef.sendImageMessage({
        //         img_width: item.width,
        //         img_height: item.height,
        //         img_size: item.size,
        //         content: item.localPath
        //     })
        // });
    }

    _onPressCommon = (text) => {
        // this.setState({ messages: MessagesManager.appendMessages(this.state.messages, newData) })
        // this.chatPageRef.sendTextMessage({ content: text })
    }

    _onPressResume = () => {
        // this.setState({ messages: MessagesManager.appendMessages(this.state.messages, newData) })
        // this.chatPageRef.sendTextMessage({ content: '简历已发送到您的邮箱' })
    }

    _captureRef = (v) => {
        this.chatPageRef = v
    }

    render() {
        return (
            <Container keyboardShouldPersistTaps={false}>
                <NavigationBar
                    title={'聊天'}
                    style={{ zIndex: 10 }}
                />
                <ChatPage
                    ref={this._captureRef}
                    user={this.user}
                    messages={this.state.messages}
                    defaultMessages={this.defaultMessages}
                    onPressSend={this._onPressSend} // 发送消息
                    onPressAlbum={this._onPressAlbum}  // 打开相册后发送图片消息
                    onPressCommon={this._onPressCommon} // 发送常用语 可自定义 不用时去掉即可
                    onPressResume={this._onPressResume} // 发送简历 可自定义 不用时去掉即可
                    onRecording={this._onRecording}
                />
            </Container>
        );
    }
}

const styles = StyleSheet.create({

});

export default Chat