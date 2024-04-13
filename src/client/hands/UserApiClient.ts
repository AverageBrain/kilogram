import { UserType } from "../../types/types";
import {BASE_SERVER_HOST, BaseApiClient} from "./BaseApiClient";

class UserApiClient extends BaseApiClient {
    getMe(): Promise<UserType> {
        return this.axiosGet<UserType>("/user/me")
    }

    editMe(user: UserType): Promise<UserType> {
        return this.axiosPost('/user/edit', user)
    }

    getUsers(afterId: number = -1): Promise<UserType[]> {
        // if first page, afterId = -1
        return this.axiosGet("/user/users/" + afterId)
    }

}

export default new UserApiClient();
