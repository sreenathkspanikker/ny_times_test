
import axios from "axios";
import {GET_VALUES} from './';
import { memoizedRefreshToken } from "./refreshToken";

var Config = {
    API_AUTH_URL : 'http://localhost:2000/auth',
    API_MAIN_URL : 'https://api.nytimes.com/svc'
};

const createAxios = (baseURL) => {
    const instance = axios.create({
        baseURL: baseURL,
        timeout: 3000
    });

    // Add a request interceptor
    instance.interceptors.request.use(function (config) {
        // return config;
        const auth = GET_VALUES('persist:root');
        const token = JSON.parse(auth.data);
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token?.data?.access_token;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;

    }, function (error) {
        return Promise.reject(error);
    });

    // Add a response interceptor
    instance.interceptors.response.use(function (response) {
        return response;
    }, async function (error) {
        const config = error?.config;
        
        if (error?.response?.status === 401 && !config?.sent) {
            config.sent = true;
      
            const result = await memoizedRefreshToken();
      
            if (result?.accessToken) {
              config.headers = {
                ...config.headers,
                authorization: `Bearer ${result?.accessToken}`,
              };
            }
      
            return axios(config);
          }
          return Promise.reject(error);

    });
    return instance;
}
const registration = createAxios(Config.API_AUTH_URL);
const baseUrl = createAxios(Config.API_MAIN_URL);

export {
    registration,
    baseUrl
};


