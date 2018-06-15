import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { EMOTIONS_DATA, EMOTIONS_ZHCN_INVERT } from './DataSource';



class RichText extends React.PureComponent {

    static propTypes = {
        style: Text.propTypes.style,
        textContent: PropTypes.string,
    };

    static defaultProps = {
        textContent: '',
    };

    constructor(props) {
        super(props);
        const contentArray = this.convertTextContent(props.textContent);
        this.state = { emojiTextArray: contentArray }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        // console.log('nextProps--->', nextProps);
        // this.state.Views.length = 0;
        let textContent = nextProps.textContent;
        const contentArray = this.convertTextContent(textContent);
        this.setState({ emojiTextArray: contentArray })
    }

    _matchContentEmojiString(textContent) {


    }

    convertTextContent = (text) => {
        const regex = new RegExp('\\[[a-zA-Z0-9\\/\\u4e00-\\u9fa5]+\\]', 'g');
        const regArray = text.match(regex);
        let contentArray = [];
        if (regArray === null) {
            contentArray.push({ "content": text });
            return contentArray;
        }
        let indexArray = [];
        let pos = text.indexOf(regArray[0]);//头  
        for (let i = 1; i < regArray.length; i++) {
            indexArray.push(pos);
            pos = text.indexOf(regArray[i], pos + 1);
        }
        indexArray.push(pos);//尾  

        console.log("indexArray = ", indexArray);
        for (let i = 0; i < indexArray.length; i++) {
            if (indexArray[i] === 0) {//一开始就是表情  
                contentArray.push({ 'resource': EMOTIONS_DATA[EMOTIONS_ZHCN_INVERT[regArray[i]]] });
            } else {
                if (i === 0) {
                    contentArray.push({ 'content': text.substr(0, indexArray[i]) });
                } else {
                    if (indexArray[i] - indexArray[i - 1] - regArray[i - 1].length > 0) {//两个表情相邻，中间不加content  
                        contentArray.push({ 'content': text.substr(indexArray[i - 1] + regArray[i - 1].length, indexArray[i] - indexArray[i - 1] - regArray[i - 1].length) });
                    }
                }
                contentArray.push({ 'resource': EMOTIONS_DATA[EMOTIONS_ZHCN_INVERT[regArray[i]]] });
            }
        }

        let lastLocation = indexArray[indexArray.length - 1] + regArray[regArray.length - 1].length;
        if (text.length > lastLocation) {
            contentArray.push({ 'content': text.substr(lastLocation, text.length - lastLocation) });
        }
        return contentArray;
    }


    render() {
        const { style, emojiStyle } = this.props
        const { emojiTextArray } = this.state
        console.log('emojiTextArray', emojiTextArray)
        return (
            <Text style={style}>
                {emojiTextArray.map((item, index) => {
                    const imageSource = item['resource']
                    const content = item['content']
                    if (imageSource) {
                        return (
                            <Image
                                key={`emoji_${index}`}
                                style={emojiStyle}
                                resizeMode={'contain'}
                                source={imageSource}
                            />
                        )
                    } else if (content) {
                        return content
                    } else {
                        return null
                    }
                })}
            </Text>
        );
    }

}


const styles = StyleSheet.create({

});

export default RichText