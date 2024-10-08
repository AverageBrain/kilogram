import BaseStore from "./BaseStore";
import {ReactionType} from "../types/types";
import {action, makeObservable, override, runInAction} from "mobx";
import {chatApiClient} from "../hands";

class ReactionsStore extends BaseStore<ReactionType> {
    constructor() {
        super();
        makeObservable(this, {
            items: override,
            selectedItem: override,
            loading: override,

            loadReactions: action.bound,
        });
    }

    async loadReactions() {
        try {
            this.enableLoading();

            const data = await chatApiClient.getReactionsTypes();
            runInAction(() => {
                this.items = data;
            });
        } catch (e: any) {
            console.warn(e);
            return false;
        } finally {
            this.disableLoading();
        }
    }
}

export default new ReactionsStore();
