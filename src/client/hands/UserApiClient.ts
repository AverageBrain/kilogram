import { UserType } from "../../types/types";
import {BASE_SERVER_HOST, BaseApiClient} from "./BaseApiClient";
import express from 'express';

class UserApiClient extends BaseApiClient {
    getMe(): Promise<UserType> {
        return this.axiosGet<UserType>("/user/me")
    }

    editMe(user: UserType): Promise<UserType> {
        return this.axiosPost('/user/edit', user)
    }

    findUsers(prefix: string): Promise<UserType[]> {
        return this.axiosGet('user/users/find/' + prefix);
    }

    getAvatar(username: string): Promise<any> {
        return this.axiosGet('user/avatar/' + username);
    }
}

export default new UserApiClient();
