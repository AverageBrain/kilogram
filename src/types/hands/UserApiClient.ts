import {User} from "../types";
import {BASE_SERVER_GITHUB_REDIRECT, BaseApiClient} from "./BaseApiClient";

export class UserApiClient extends BaseApiClient {
    async authWithGithub(): Promise<null> {
        window.location.href = BASE_SERVER_GITHUB_REDIRECT
        return null
    }

    getMe(): Promise<User> {
        return this.axiosGet<User>("/user/me")
    }

    editMe(user: User): Promise<User> {
        return this.axiosPost('/user/edit', user)
    }
}
