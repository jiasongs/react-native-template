import { action, observable, runInAction, configure } from 'mobx'

configure({ enforceActions: true });

class BaseStore {

    @observable loading = true;
    @observable error = { isError: '', errorMsg: '' };

    constructor(params) {

    }

}

export default BaseStore;