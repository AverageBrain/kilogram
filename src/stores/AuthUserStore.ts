import { action, computed, makeObservable, override, runInAction } from 'mobx';
import { isEmpty } from 'lodash';

import { UserType } from '../types';
import BaseStore from './BaseStore';
import { userApiClient } from '../hands';
import { processSSEMessage } from '../utils';

class AuthUserStore extends BaseStore<UserType> {
    constructor() {
        super();
        makeObservable(this, {
            items: override,
            selectedItem: override,
            loading: override,

            loggedIn: computed,

            loadSelectedItem: action.bound,
        });
        this.loading = true
    }

    get loggedIn(): boolean {
        return !isEmpty(this.selectedItem);
    }

    async loadSelectedItem(): Promise<void> {
        try {
            this.enableLoading();

            const data = await userApiClient.getMe();

            if (data) {
                userApiClient.setMessagesSource(processSSEMessage);
            }

            runInAction(() => {
                this.selectedItem = data;
            });
        } catch (e: any) {
            console.warn(e);
        } finally {
            this.disableLoading();
        }
    }
}

export default new AuthUserStore();
