import { AudioRecorder, AudioUtils } from 'react-native-audio';
import { PermissionsAndroid } from 'react-native';

const option = {
    SampleRate: 22050,
    Channels: 1,
    AudioQuality: "Low",
    AudioEncoding: "aac",
    AudioEncodingBitRate: 32000
}

const defaultAudioPath = AudioUtils.CachesDirectoryPath + '/tmp.aac'

class RecordManager {

    static ceshiAudioPath = AudioUtils.CachesDirectoryPath + '/tmp.aac'

    static checkPermission = async () => {
        if (__IOS__) {
            return Promise.resolve(true);
        }
        const rationale = {
            'title': '录音权限',
            'message': '需要您同意录音权限'
        };
        const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
        console.log('Permission result:', result);
        return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
    }

    static prepareRecording = async (onProgress, onFinished) => {
        console.log('prepareRecordingPath', defaultAudioPath)
        const result = await RecordManager.checkPermission()
        console.log('prepareRecording', result)
        if (result) {
            AudioRecorder.prepareRecordingAtPath(defaultAudioPath, option);
            AudioRecorder.onProgress = onProgress
            AudioRecorder.onFinished = onFinished
        } else {

        }
    }

    // 开始录音
    static startRecord = async () => {
        const result = await RecordManager.checkPermission()
        if (result) {
            if (__ANDROID__) {
                // 安卓必须再次调用
                AudioRecorder.prepareRecordingAtPath(defaultAudioPath, option);
            }
            AudioRecorder.startRecording();
        }
    }

    // 停止录音
    static stopRecord = () => {
        AudioRecorder.stopRecording();
    }
}

export default RecordManager