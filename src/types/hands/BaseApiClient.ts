import axios, {AxiosResponse} from 'axios'

export const BASE_SERVER_HOST = 'http://localhost:3001/api/'

const axiosClient = axios.create(
    {
        baseURL: BASE_SERVER_HOST,
        withCredentials: true
    }
);
export abstract class BaseApiClient {
    async axiosPost<T>(url: string, data: object): Promise<T> {
        return (await axiosClient.post<T>(url, data)).data
    }

    async axiosGet<T>(url: string): Promise<T> {
        console.log("YES")
        return (await axiosClient.get<T>(url)).data
    }

    async axiosGetRaw<T>(url: string): Promise<AxiosResponse<T>> {
        return (await axiosClient.get<T>(url))
    }
}

