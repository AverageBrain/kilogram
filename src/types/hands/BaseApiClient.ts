import axios, {AxiosResponse} from 'axios'

const axiosClient = axios.create(
    {
        baseURL: '/api/',
        withCredentials: true
    }
);
axiosClient.interceptors.response.use(
    response => {
        console.log("FISH")
        return response},
    error => {
        console.log("YESYES ")
        console.log(error)
        if (error.response && [301, 302].includes(error.response.status)) {
            window.location.href = error.response.headers.location;
        }
        return Promise.reject(error);
    }
);


export abstract class BaseApiClient {
    async axiosPost<T>(url: string, data: object): Promise<T> {
        return (await axiosClient.post<T>(url, data)).data
    }

    async axiosGet<T>(url: string): Promise<T> {
        return (await axiosClient.get<T>(url)).data
    }

    async axiosGetRaw<T>(url: string): Promise<AxiosResponse<T>> {
        return (await axiosClient.get<T>(url))
    }
}

