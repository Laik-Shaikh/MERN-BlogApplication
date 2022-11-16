import axios from 'axios';
import { API_NOTIFICATION_MESSAGE, SERVICE_URLS } from '../constants/config';
import { getAccessToken, getType } from '../utilis/utilis';

const API_URL = "http://localhost:8000";

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Accept": "application/json, form-data", 
    }
});

axiosInstance.interceptors.request.use(
    function(config) {
        if (config.TYPE.params) {
            config.params = config.TYPE.params
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        return processResponse(response);
    },
    function (error) {
        return Promise.reject(ProcessError(error));
    }
);

const processResponse = (response) => {
    if(response?.status === 200) {
        return { isTrue: true, data: response.data }
    } else {
        return {
            isFailure: true,
            status : response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

const ProcessError = (error) => {
    if(error.response === 409){
        return {
            isAlreadyExists: true,
            msg: API_NOTIFICATION_MESSAGE.alreadyExists,
            code: error.response.status
        }
    } else if(error.response) {
        // Got response apart from 200
        return {
            isTrue: true,
            msg: API_NOTIFICATION_MESSAGE.responseFailure,
            code: error.response.status
        }
    } else if(error.request) {
        // send the request successfully but never got response
        return {
            isTrue: true,
            msg: API_NOTIFICATION_MESSAGE.requestFailure,
            code: ""
        }
    }
     else {
        // something went wrong (maybe from frontend)
        return {
            isTrue: true,
            msg: API_NOTIFICATION_MESSAGE.networkFailure,
            code: ""
        }
    }
}

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === "DELETE"? {} : body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken(),
            },
            TYPE: getType(value, body),
        })
}

export { API };







// function (config) {
//     return config;
// },
// function (error) {
//     return Promise.reject(error);
// }