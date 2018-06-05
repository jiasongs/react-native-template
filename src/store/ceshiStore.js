import { action, observable } from 'mobx'
import BaseStore from './baseStore'

class SearchStore extends BaseStore {

    @observable query = '点击跳转';
    @action
    addQury = (z) => {
        return this.query = z
    };

    constructor(params) {
        super(params)

    }
}

export default SearchStore;