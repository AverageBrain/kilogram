import {UserType} from "../types/types";
import {BaseApiClient} from "./BaseApiClient";

class UserApiClient extends BaseApiClient {
    getMe(): Promise<UserType> {
        return this.axiosGet<UserType>('/user/me');
    }

    editMe(user: UserType): Promise<UserType> {
        return this.axiosPost('/user/edit', user);
    }

    setFirebaseToken(token: string) {
        return this.axiosPost('/user/setFirebaseToken', {token})
    }

    findUsers(prefix: string): Promise<UserType[]> {
        return this.axiosGet('user/users/find/' + prefix);
    }

    getUsers(): Promise<UserType[]> {
        return this.axiosGet('user/users');
    }

    getAvatar(id: number): Promise<string> {
        return this.axiosGet('user/avatar/' + id);
    }
}

export default new UserApiClient();
