import { AudioRecorder, AudioUtils } from 'react-native-audio';


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

    static prepareRecording = (onProgress, onFinished) => {
        console.log('prepareRecordingPath', defaultAudioPath)
        AudioRecorder.prepareRecordingAtPath(defaultAudioPath, option);
        AudioRecorder.onProgress = onProgress
        AudioRecorder.onFinished = onFinished
    }

    // 开始录音
    static startRecord = () => {
        AudioRecorder.startRecording();
    }

    // 停止录音
    static stopRecord = () => {
        AudioRecorder.stopRecording();
    }
}

export default RecordManager