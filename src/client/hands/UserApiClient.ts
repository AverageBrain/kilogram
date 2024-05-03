import { UserType } from "../../types/types";
import {BASE_SERVER_HOST, BaseApiClient} from "./BaseApiClient";
import express from 'express';

class UserApiClient extends BaseApiClient {
    getMe(): Promise<UserType> {
        return this.axiosGet<UserType>('/user/me');
    }

    editMe(user: UserType): Promise<UserType> {
        return this.axiosPost('/user/edit', user);
    }

    findUsers(prefix: string): Promise<UserType[]> {
        return this.axiosGet('user/users/find/' + prefix);
    }

    getUsers(): Promise<UserType[]> {
        return this.axiosGet('user/users');
    }

    getAvatar(id: number): Promise<any> {
        return this.axiosGet('user/avatar/' + id);
    }
}

export default new UserApiClient();
