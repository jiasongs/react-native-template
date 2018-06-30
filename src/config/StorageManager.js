'use strict';
import AsyncStorage from '../util/AsyncStorage';

class StorageManager {

    static load = async (key) => {
        let reslut = { data: null }
        try {
            const loadData = await AsyncStorage.load({ key })
            reslut = { data: loadData }
            console.log('StorageManager_load', reslut)
            return Promise.resolve(reslut)
        } catch (error) {
            console.log('StorageManager_load_error', error)
            return Promise.resolve(reslut)
        }
    }

    static save = async (key, data) => {
        let reslut = { data: null }
        try {
            const saveData = await AsyncStorage.save({ key, data })
            reslut = { data: saveData }
            console.log('StorageManager_save', reslut)
            return Promise.resolve(reslut)
        } catch (error) {
            console.log('StorageManager_save_error', error)
            return Promise.resolve(reslut)
        }
    }
}

export default StorageManager