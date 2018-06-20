import Sound from 'react-native-sound';
import { AudioUtils } from 'react-native-audio';

const defaultFileName = 'tmp.aac'
const defaultAudioPath = AudioUtils.CachesDirectoryPath
const timeouts = 0
class SoundManager {

    static soundInstance = null

    static createSound = (fileName, basePath, errFunc) => {
        SoundManager.releaseSound()
        SoundManager.soundInstance = new Sound(fileName, basePath, errFunc);
    }

    static startSound = (errFunc) => {
        SoundManager.createSound(defaultFileName, defaultAudioPath, errFunc)
        timeouts = setTimeout(() => {
            SoundManager.soundInstance.play((success) => {
                console.log('success', success)
            })
        }, 300);
    }

    static stopSound = () => {
        if (SoundManager.soundInstance && SoundManager.soundInstance.isPlaying) {
            SoundManager.soundInstance.stop()
        }
    }

    static releaseSound = () => {
        if (SoundManager.soundInstance) {
            clearTimeout(timeouts)
            SoundManager.soundInstance.release();
            SoundManager.soundInstance = null
        }
    }

}

export default SoundManager