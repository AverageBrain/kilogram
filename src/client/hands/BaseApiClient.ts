import axios, {AxiosResponse} from 'axios'

export const BASE_SERVER_GITHUB_REDIRECT = 'http://158.160.118.181:3002/api/auth/github'
export const BASE_SERVER_HOST = 'http://localhost:3002/api/' // TODO: вынести

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

    async axiosGet<T>(url: string): Promise<T> {
        return (await axiosClient.get<T>(normalizeUrl(url))).data
    }

    async axiosGetRaw<T>(url: string): Promise<AxiosResponse<T>> {
        return (await axiosClient.get<T>(normalizeUrl(url)))
    }

    getNewMessage(callback: (data: any) => void) {
        const sse = new EventSource(BASE_SERVER_HOST + 'user/sse', {withCredentials: true});
        sse.onmessage = (ev) => {
            const data = JSON.parse(ev.data)
            callback(data)
        };
    }
}

