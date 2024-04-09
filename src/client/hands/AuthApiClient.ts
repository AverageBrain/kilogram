import {BASE_SERVER_GITHUB_REDIRECT, BaseApiClient} from "./BaseApiClient";

class AuthApiClient extends BaseApiClient {
    async authWithGithub(): Promise<null> {
        window.location.href = BASE_SERVER_GITHUB_REDIRECT;
        return null;
    }

    async authGithubCallback(url: string) {
        return this.axiosGet(url);
    }

    async logout() {
        return this.axiosGet("/logout");
    }
}

export default new AuthApiClient();
