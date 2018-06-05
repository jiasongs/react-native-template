import { action, observable, runInAction } from 'mobx'

class SearchStore1111 {

    @observable query = '123';


    @action
    request = async (url, query) => {
        this.loading = true
        let reslut = await Services.get(url, query)
        runInAction(() => {
            this.loading = false
        })
        return reslut
    }
}

export default SearchStore1111;