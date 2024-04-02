import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'

export abstract class BaseHandsClient {
    private AXIOS_CONFIG: AxiosRequestConfig = {
        baseURL: 'test',
        withCredentials: true,
    }

    async axiosPost<T>(url: string, data: object): Promise<AxiosResponse<T>> {
        return await axios.post<T>(url, data, this.AXIOS_CONFIG)
    }

    async axiosGet<T>(url: string): Promise<AxiosResponse<T>> {
        return await axios.post<T>(url, this.AXIOS_CONFIG)
    }
}

