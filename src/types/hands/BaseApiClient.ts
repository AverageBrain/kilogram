import axios, {AxiosRequestConfig} from 'axios'

export abstract class BaseApiClient {
    private AXIOS_CONFIG: AxiosRequestConfig = {
        baseURL: 'test',
        withCredentials: true,
    }

    async axiosPost<T>(url: string, data: object): Promise<T> {
        return (await axios.post<T>(url, data, this.AXIOS_CONFIG)).data
    }

    async axiosGet<T>(url: string): Promise<T> {
        return (await axios.post<T>(url, this.AXIOS_CONFIG)).data
    }
}

