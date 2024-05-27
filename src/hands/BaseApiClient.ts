import axios, { AxiosResponse } from 'axios'

// production
export const BASE_SERVER_GITHUB_REDIRECT = 'http://team1.ya-itmo.ru/api/auth/github'
export const BASE_SERVER_HOST = '/api/' // TODO: вынести
export const BASE_LOGOUT_HOST = '/';

// export const BASE_SERVER_GITHUB_REDIRECT = 'http://localhost:3002/api/auth/github';
// export const BASE_SERVER_HOST = 'http://localhost:3002/api/';
// export const BASE_LOGOUT_HOST = 'http://localhost:3000/';


const axiosClient = axios.create(
    {
        baseURL: BASE_SERVER_HOST,
        withCredentials: true
    }
);

const normalizeUrl = (url: string) => {
    if (url.startsWith('/')) {
        url = url.slice(1);
    }
    return url
}

export abstract class BaseApiClient {
    async axiosPost<T>(url: string, data: object): Promise<T> {
        return (await axiosClient.post<T>(normalizeUrl(url), data)).data
    }

    async axiosPostForm<T>(url: string, form: FormData): Promise<T> {
        return (await axiosClient.postForm<T>(normalizeUrl(url), form)).data
    }

    async axiosGet<T>(url: string): Promise<T> {
        return (await axiosClient.get<T>(normalizeUrl(url))).data
    }

    async axiosGetRaw<T>(url: string): Promise<AxiosResponse<T>> {
        return (await axiosClient.get<T>(normalizeUrl(url)))
    }

    setMessagesSource(callback: (data: any) => void) {
        const sse = new EventSource(BASE_SERVER_HOST + 'user/sse', { withCredentials: true });
        sse.onmessage = (ev) => {
            const data = JSON.parse(ev.data)
            callback(data)
        };
    }
}

