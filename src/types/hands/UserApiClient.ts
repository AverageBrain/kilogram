import {User} from "../types";
import {BaseApiClient} from "./BaseApiClient";

export class UserApiClient extends BaseApiClient {
    async authWithGithub(): Promise<null> {
        const res = await fetch("/api/auth/github")
        console.log("qyqyqyq")

        console.log(res.headers)
        // document.location.href = res.headers
        return null
    }

    getMe(): Promise<User> {
        return this.axiosGet<User>("/user/me")
    }

    editMe(user: User): Promise<User> {
        return this.axiosPost('/user/edit', user)
    }
}
