import { Menu } from 'teaset';
import { fontSize } from '../util/Tool'
import Theme from './Theme'

/**
 * const params = {
    viewRef: this.view,
    actions: [
        {title: 'Search', icon: require('../icons/search.png'), onPress: () => alert('Search')},
        {title: 'Edit', icon: require('../icons/edit.png'), onPress: () => alert('Edit')},
        {title: 'Remove', icon: require('../icons/trash.png'), onPress: () => alert('Remove')},
    ],
    offsetX:0, // 偏移的x值
    offsetY:0 // 偏移的y值
}
 */
class MenuManager {

    static show(params) {
        const view = params.viewRef
        const offsetX = params.offsetX === undefined ? 0 : params.offsetX
        const offsetY = params.offsetY === undefined ? 0 : params.offsetY
        const actions = params.actions
        view.measure((x, y, width, height, pageX, pageY) => {
            Menu.show({ x: pageX + offsetX, y: pageY + offsetY, width, height }, actions, Theme.menuOptions);
        });
    }

}


export default MenuManager