import {User} from "../types";
import {BaseApiClient} from "./BaseApiClient";

export class UserApiClient extends BaseApiClient {
    authWithGithub(): Promise<User> {
        return this.axiosGet<User>("/auth/github")
    }

    getMe(): Promise<User> {
        return this.axiosGet<User>("/user/me")
    }

    editMe(user: User): Promise<User> {
        return this.axiosPost('/user/edit', user)
    }
}
