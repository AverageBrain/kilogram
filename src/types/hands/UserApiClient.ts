import {User} from "../types";
import {BaseApiClient} from "./BaseApiClient";

export class UserApiClient extends BaseApiClient {
    getMe(): Promise<User> {
        return this.axiosGet<User>("/user/me")
    }

    editMe(user: User): Promise<User> {
        return this.axiosPost('/user/edit', user)
    }

    getUsers(afterId: number = -1): Promise<User[]> {
        // if first page, afterId = -1
        return this.axiosGet("user/users/" + afterId)
    }
}
