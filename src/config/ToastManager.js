
import { Toast } from 'teaset';
import Theme from './Theme';

class ToastManager {

    static show = (text) => {
        Toast.show({
            text: text,
            option: Theme.toastOptions
        });
    }

}

export default ToastManager