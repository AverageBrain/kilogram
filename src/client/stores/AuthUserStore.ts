import {action, makeObservable, override, runInAction} from 'mobx';
import {MessageType, UserType} from '../../types';
import BaseStore from './BaseStore';
import {userApiClient} from '../hands';

class AuthUserStore extends BaseStore<UserType> {
    constructor() {
        super();
        makeObservable(this, {
            items: override,
            selectedItem: override,
            loading: override,

            loadSelectedItem: action.bound,
        });
        this.loading = true
    }

    async loadSelectedItem(): Promise<void> {
        try {
            this.enableLoading();

            const data = await userApiClient.getMe();

            userApiClient.getNewMessage(this.addNewMessage)

            runInAction(() => {
                this.selectedItem = data;
            });
        } catch (e: any) {
            console.warn(e);
        } finally {
            this.disableLoading();
        }
    }

    async addNewMessage(data: any) {
        if (data['type'] == 'newMessage') {
            const message: MessageType = data['data']
            console.log(message)
            // todo paste message
        }
    }
}

export default new AuthUserStore();
